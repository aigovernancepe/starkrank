import { useState } from 'react';
import type { ScoredService, ServiceCardCopy, FormField, Market } from '../../../data/service-finder/types';
import { services } from '../../../data/service-finder/services';
import ServiceResultCard from '../ui/ServiceResultCard';

interface Props {
  heading: string;
  subheading: string;
  results: ScoredService[];
  market: Market;
  serviceCards: Record<string, ServiceCardCopy>;
  secondaryCta: { text: string; buttonText: string; link: string };
  emailCapture: {
    heading: string;
    subtext: string;
    buttonText: string;
    privacyNote?: string;
    fields: FormField[];
  };
  startOverLabel: string;
  role: string | null;
  roleLabel: string;
  industry: string | null;
  industryLabel: string;
  selectedQuestions: string[];
  onReset: () => void;
  onCtaClick: (serviceId: string, ctaType: string) => void;
  onEmailSubmit: () => void;
}

export default function ResultStep({
  heading, subheading, results, market, serviceCards,
  secondaryCta, emailCapture, startOverLabel,
  role, roleLabel, industry, industryLabel, selectedQuestions,
  onReset, onCtaClick, onEmailSubmit,
}: Props) {
  const [emailOpen, setEmailOpen] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [formData, setFormData] = useState<Record<string, string>>({});

  const [consentChecked, setConsentChecked] = useState(false);

  function marketToLocale(m: Market): 'de' | 'ch-de' | 'en' {
    if (m === 'de') return 'de';
    if (m === 'ch-de') return 'ch-de';
    return 'en';
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consentChecked) return;
    setFormState('sending');

    const intentData = JSON.stringify({
      role,
      role_label: roleLabel,
      industry,
      industry_label: industryLabel,
      questions: selectedQuestions,
      market,
      results: results.map(r => r.serviceId),
      completed: new Date().toISOString(),
    });

    const recommendedServices = results.map(r => r.serviceId).join(', ');
    const message = `Service Finder result: ${recommendedServices}. Role: ${roleLabel}. Industry: ${industryLabel}.`;

    const body = new FormData();
    body.set('form_type', 'service-finder');
    body.set('locale', marketToLocale(market));
    body.set('lead_source_page', window.location.pathname);
    body.set('name', formData.firstname || '');
    body.set('email', formData.email || '');
    body.set('message', message);
    body.set('intent_data', intentData);
    body.set('consent', 'true');
    body.set('website', '');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body,
      });
      if (!res.ok) {
        setFormState('error');
        return;
      }
      setFormState('sent');
      onEmailSubmit();
    } catch {
      setFormState('error');
    }
  }

  return (
    <div className="sf-step">
      <h2 className="sf-step__heading">{heading}</h2>
      <p className="sf-step__sub">{subheading}</p>

      <div className="sf-results">
        {results.map((result, i) => {
          const svc = services.find(s => s.id === result.serviceId);
          if (!svc) return null;
          const copy = serviceCards[result.serviceId];
          if (!copy) return null;
          const link = svc.links[market] || '#';
          return (
            <ServiceResultCard
              key={result.serviceId}
              serviceId={result.serviceId}
              icon={svc.icon}
              copy={copy}
              link={link}
              rank={i}
              onCtaClick={onCtaClick}
            />
          );
        })}
      </div>

      <div className="sf-secondary-cta">
        <p>{secondaryCta.text}</p>
        <a href={secondaryCta.link} className="sf-secondary-cta__btn">
          {secondaryCta.buttonText} &rarr;
        </a>
      </div>

      <div className="sf-email-section">
        {!emailOpen && formState !== 'sent' && (
          <button
            type="button"
            className="sf-email-toggle"
            onClick={() => setEmailOpen(true)}
          >
            {emailCapture.heading}
          </button>
        )}

        {emailOpen && formState !== 'sent' && (
          <form className="sf-email-form" onSubmit={handleSubmit}>
            <p className="sf-email-form__sub">{emailCapture.subtext}</p>
            {emailCapture.fields.map(field => (
              <div key={field.name} className="sf-email-form__field">
                <label htmlFor={`sf-${field.name}`} className="sf-email-form__label">
                  {field.label}{field.required && ' *'}
                </label>
                <input
                  id={`sf-${field.name}`}
                  type={field.type}
                  name={field.name}
                  required={field.required}
                  className="sf-email-form__input"
                  value={formData[field.name] || ''}
                  onChange={e => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                />
              </div>
            ))}
            <label className="sf-email-form__consent">
              <input
                type="checkbox"
                checked={consentChecked}
                onChange={e => setConsentChecked(e.target.checked)}
                required
              />
              {emailCapture.privacyNote ? (
                <span dangerouslySetInnerHTML={{ __html: emailCapture.privacyNote }} />
              ) : (
                <span>I consent to having my data processed.</span>
              )}
            </label>
            <button
              type="submit"
              className="sf-submit"
              disabled={formState === 'sending' || !consentChecked}
            >
              {formState === 'sending' ? '...' : emailCapture.buttonText}
            </button>
            {formState === 'error' && (
              <p className="sf-email-form__error">Something went wrong. Please try again.</p>
            )}
          </form>
        )}

        {formState === 'sent' && (
          <p className="sf-email-form__success">
            {market === 'es' ? 'Enviado. Revisa tu correo.' :
             market === 'de' || market === 'ch-de' ? 'Gesendet. Pr\u00fcfen Sie Ihre E-Mail.' :
             'Sent! Check your inbox.'}
          </p>
        )}
      </div>

      <button type="button" className="sf-start-over" onClick={onReset}>
        {startOverLabel}
      </button>
    </div>
  );
}
