interface Env {
  APPS_SCRIPT_URL: string;
  APPS_SCRIPT_SECRET: string;
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY: string;
  LEAD_NOTIFY_EMAIL: string;
}

interface PagesFunction<E = Record<string, unknown>> {
  (context: {
    request: Request;
    env: E;
    waitUntil: (promise: Promise<unknown>) => void;
  }): Response | Promise<Response>;
}

const FORM_TYPES = ['kontakt', 'aiso', 'copywriting', 'google-ads', 'service-finder'] as const;
type FormType = (typeof FORM_TYPES)[number];

const LOCALES = ['de', 'ch-de', 'en'] as const;
type Locale = (typeof LOCALES)[number];

const THANK_YOU_PATH: Record<Locale, string> = {
  'de': '/danke/',
  'ch-de': '/ch-de/danke/',
  'en': '/en/thanks/',
};

const SITE_ORIGIN = 'https://starkrank.com';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const wantsJson = request.headers.get('accept')?.includes('application/json') ?? false;

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return wantsJson
      ? jsonResponse({ ok: false, error: 'bad-request' }, 400)
      : new Response('Bad request', { status: 400 });
  }

  const get = (key: string) => (formData.get(key) ?? '').toString().trim();

  const honeypot = get('website');
  if (honeypot) {
    return wantsJson
      ? jsonResponse({ ok: true }, 200)
      : Response.redirect(redirectURL(get('locale'), request), 303);
  }

  const formType = normalizeFormType(get('form_type'));
  const locale = normalizeLocale(get('locale'));
  const name = get('name');
  const email = get('email');
  const message = get('message');
  const consent = get('consent');

  if (!name || !email || !message || consent !== 'true') {
    return errorResponse(locale, 'missing-fields', request, wantsJson);
  }
  if (!isValidEmail(email)) {
    return errorResponse(locale, 'invalid-email', request, wantsJson);
  }

  // Service Finder skips Turnstile — multi-step wizard provides its own friction layer.
  if (formType !== 'service-finder') {
    const turnstileToken = get('cf-turnstile-response');
    if (!turnstileToken) {
      return errorResponse(locale, 'turnstile-missing', request, wantsJson);
    }
    const turnstilePass = await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET_KEY, request);
    if (!turnstilePass) {
      return errorResponse(locale, 'turnstile-failed', request, wantsJson);
    }
  }

  const leadSourcePage = get('lead_source_page') || '/';
  const userAgent = request.headers.get('user-agent') ?? '';
  const ipCountry = request.headers.get('cf-ipcountry') ?? '';

  const payload = {
    secret: env.APPS_SCRIPT_SECRET,
    timestamp: new Date().toISOString(),
    form_type: formType,
    locale,
    lead_source_page: leadSourcePage,
    name,
    email,
    message,
    company: get('company'),
    phone: get('phone'),
    website_url: get('website_url'),
    google_ads_customer_id: get('google_ads_customer_id'),
    intent_data: get('intent_data'),
    consent_given: true,
    user_agent: userAgent,
    ip_country: ipCountry,
  };

  const sheetOk = await appendToSheet(env.APPS_SCRIPT_URL, payload);
  if (!sheetOk) {
    return errorResponse(locale, 'sheet-failed', request, wantsJson);
  }

  await sendNotification(env.RESEND_API_KEY, env.LEAD_NOTIFY_EMAIL, payload).catch(() => {
    // email is non-critical; sheet is source of truth
  });

  return wantsJson
    ? jsonResponse({ ok: true }, 200)
    : Response.redirect(redirectURL(locale, request), 303);
};

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function normalizeFormType(value: string): FormType {
  return (FORM_TYPES as readonly string[]).includes(value) ? (value as FormType) : 'kontakt';
}

function normalizeLocale(value: string): Locale {
  return (LOCALES as readonly string[]).includes(value) ? (value as Locale) : 'de';
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function redirectURL(locale: string, request: Request): string {
  const safeLocale = normalizeLocale(locale);
  const origin = new URL(request.url).origin || SITE_ORIGIN;
  return `${origin}${THANK_YOU_PATH[safeLocale]}`;
}

function errorResponse(locale: Locale, code: string, request: Request, wantsJson = false): Response {
  if (wantsJson) {
    return jsonResponse({ ok: false, error: code }, 400);
  }
  const origin = new URL(request.url).origin || SITE_ORIGIN;
  const target = `${origin}${THANK_YOU_PATH[locale]}?error=${encodeURIComponent(code)}`;
  return Response.redirect(target, 303);
}

async function verifyTurnstile(token: string, secret: string, request: Request): Promise<boolean> {
  const remoteIp = request.headers.get('cf-connecting-ip') ?? '';
  const body = new URLSearchParams({
    secret,
    response: token,
    ...(remoteIp ? { remoteip: remoteIp } : {}),
  });
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

async function appendToSheet(appsScriptUrl: string, payload: Record<string, unknown>): Promise<boolean> {
  if (!appsScriptUrl) {
    console.error('[lead-form] APPS_SCRIPT_URL is empty');
    return false;
  }
  if (!appsScriptUrl.endsWith('/exec')) {
    console.error('[lead-form] APPS_SCRIPT_URL does not end with /exec — got:', appsScriptUrl.slice(-30));
  }
  try {
    const res = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });
    const text = await res.text();
    if (!res.ok) {
      console.error('[lead-form] Apps Script HTTP error:', res.status, text.slice(0, 200));
      return false;
    }
    let data: { ok?: boolean; error?: string };
    try {
      data = JSON.parse(text) as { ok?: boolean; error?: string };
    } catch {
      console.error('[lead-form] Apps Script returned non-JSON:', text.slice(0, 200));
      return false;
    }
    if (data.ok !== true) {
      console.error('[lead-form] Apps Script returned non-ok:', data);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[lead-form] Apps Script fetch threw:', err);
    return false;
  }
}

async function sendNotification(apiKey: string, to: string, payload: Record<string, unknown>): Promise<void> {
  const subject = `[StarkRank Lead] ${payload.form_type} — ${payload.name}`;
  const lines = [
    `Form: ${payload.form_type}`,
    `Locale: ${payload.locale}`,
    `Source: ${payload.lead_source_page}`,
    `IP-Country: ${payload.ip_country}`,
    '',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.company ? `Company: ${payload.company}` : null,
    payload.phone ? `Phone: ${payload.phone}` : null,
    payload.website_url ? `Website: ${payload.website_url}` : null,
    payload.google_ads_customer_id ? `Google Ads ID: ${payload.google_ads_customer_id}` : null,
    '',
    'Message:',
    String(payload.message),
    payload.intent_data ? `\nIntent data: ${payload.intent_data}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: 'StarkRank Leads <leads@starkrank.com>',
      to: [to],
      reply_to: String(payload.email),
      subject,
      text: lines,
    }),
  });
}
