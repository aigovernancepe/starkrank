import { useState, useEffect, useRef } from 'react';
import type { ServiceFinderLocale, ServiceFinderState, Question, Market } from '../../data/service-finder/types';
import {
  computeResults,
  roleIndustryFilter,
  roleQuestionFilter,
  industryQuestionFilter,
  marketIndustries,
} from '../../data/service-finder/routing';
import StepIndicator from './ui/StepIndicator';
import BackButton from './ui/BackButton';
import RoleStep from './steps/RoleStep';
import IndustryStep from './steps/IndustryStep';
import QuestionsStep from './steps/QuestionsStep';
import ResultStep from './steps/ResultStep';
import './ServiceFinder.css';

interface Props {
  locale: ServiceFinderLocale;
  market: Market;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function trackEvent(name: string, params: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}

function getSource(): string {
  if (typeof window === 'undefined') return 'direct';
  const ref = document.referrer;
  if (!ref) return 'direct';
  try {
    const url = new URL(ref);
    if (url.origin === window.location.origin && url.pathname.includes('/blog')) return 'blog';
  } catch { /* ignore */ }
  return 'direct';
}

export default function ServiceFinderApp({ locale, market }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef<HTMLDivElement>(null);
  const startTracked = useRef(false);

  const [state, setState] = useState<ServiceFinderState>({
    step: 1,
    role: null,
    industry: null,
    selectedQuestions: [],
    results: [],
  });

  // Track visibility (schnellcheck_start)
  useEffect(() => {
    if (startTracked.current || !containerRef.current) return;
    const el = containerRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        trackEvent('schnellcheck_start', { market, source: getSource() });
        startTracked.current = true;
        observer.disconnect();
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [market]);

  // Focus management on step change
  useEffect(() => {
    if (liveRef.current) {
      const firstFocusable = liveRef.current.querySelector<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus({ preventScroll: true });
    }
  }, [state.step]);

  function selectRole(roleId: string) {
    const label = locale.steps.role.options.find(o => o.id === roleId)?.label ?? roleId;
    trackEvent('schnellcheck_role', { role_id: roleId, role_label: label });

    if (roleId === 'R6') {
      setState(s => ({ ...s, role: roleId, industry: null, step: 3 }));
    } else {
      setState(s => ({ ...s, role: roleId, step: 2 }));
    }
  }

  function selectIndustry(industryId: string) {
    const label = locale.steps.industry.options.find(o => o.id === industryId)?.label ?? industryId;
    trackEvent('schnellcheck_industry', { industry_id: industryId, industry_label: label });
    setState(s => ({ ...s, industry: industryId, step: 3 }));
  }

  function submitQuestions(questionIds: string[]) {
    trackEvent('schnellcheck_questions', {
      question_ids: questionIds,
      question_count: questionIds.length,
    });

    const results = computeResults(questionIds, market);

    trackEvent('schnellcheck_result', {
      services_shown: results.map(r => r.serviceId),
      primary_service: results[0]?.serviceId,
    });

    setState(s => ({ ...s, selectedQuestions: questionIds, results, step: 4 }));
  }

  function goBack() {
    setState(s => {
      if (s.step === 3 && s.role === 'R6') {
        return { ...s, step: 1 };
      }
      return { ...s, step: Math.max(1, s.step - 1) as 1 | 2 | 3 | 4 };
    });
  }

  function navigateToStep(step: number) {
    if (step < state.step) {
      setState(s => ({ ...s, step: step as 1 | 2 | 3 | 4 }));
    }
  }

  function reset() {
    setState({ step: 1, role: null, industry: null, selectedQuestions: [], results: [] });
  }

  function onCtaClick(serviceId: string, ctaType: string) {
    trackEvent('schnellcheck_cta_click', { service_clicked: serviceId, cta_type: ctaType });
  }

  function onEmailSubmit() {
    trackEvent('schnellcheck_email_submit', {
      role_id: state.role,
      industry_id: state.industry,
      question_ids: state.selectedQuestions,
    });
  }

  // Build filtered industry options
  function getFilteredIndustries() {
    if (!state.role) return locale.steps.industry.options;
    const filter = roleIndustryFilter[state.role];
    if (filter === 'skip' || filter === 'all') {
      return locale.steps.industry.options.filter(o =>
        marketIndustries[market].includes(o.id)
      );
    }
    return locale.steps.industry.options.filter(o =>
      filter.includes(o.id) && marketIndustries[market].includes(o.id)
    );
  }

  // Build filtered questions
  function getFilteredQuestions(): Question[] {
    const questions: Question[] = [...locale.steps.questions.universal];

    if (state.role && state.role !== 'R7') {
      const roleQIds = roleQuestionFilter[state.role] || [];
      const roleQs = locale.steps.questions.byRole[state.role] || [];
      questions.push(...roleQs.filter(q => roleQIds.includes(q.id)));
    }

    if (state.industry) {
      const indQIds = industryQuestionFilter[state.industry] || [];
      const indQs = locale.steps.questions.byIndustry[state.industry] || [];
      questions.push(...indQs.filter(q => indQIds.includes(q.id)));
    }

    return questions;
  }

  const backLabel = market === 'es' ? 'Atr\u00e1s' : market === 'de' || market === 'ch-de' ? 'Zur\u00fcck' : 'Back';

  return (
    <div
      ref={containerRef}
      className="sf"
      role="application"
      aria-label={locale.intro.h1}
    >
      <StepIndicator current={state.step} total={4} onNavigate={navigateToStep} />

      {state.step > 1 && <BackButton onClick={goBack} label={backLabel} />}

      <div ref={liveRef} aria-live="polite">
        {state.step === 1 && (
          <RoleStep
            heading={locale.steps.role.heading}
            options={locale.steps.role.options}
            onSelect={selectRole}
          />
        )}
        {state.step === 2 && (
          <IndustryStep
            heading={locale.steps.industry.heading}
            options={getFilteredIndustries()}
            onSelect={selectIndustry}
          />
        )}
        {state.step === 3 && (
          <QuestionsStep
            heading={locale.steps.questions.heading}
            hint={locale.steps.questions.hint}
            questions={getFilteredQuestions()}
            submitLabel={locale.steps.result.submitButton}
            onSubmit={submitQuestions}
          />
        )}
        {state.step === 4 && (
          <ResultStep
            heading={locale.steps.result.heading}
            subheading={locale.steps.result.subheading}
            results={state.results}
            market={market}
            serviceCards={locale.steps.result.serviceCards}
            secondaryCta={locale.steps.result.secondaryCta}
            emailCapture={locale.steps.result.emailCapture}
            startOverLabel={locale.steps.result.startOver}
            role={state.role}
            industry={state.industry}
            selectedQuestions={state.selectedQuestions}
            onReset={reset}
            onCtaClick={onCtaClick}
            onEmailSubmit={onEmailSubmit}
          />
        )}
      </div>
    </div>
  );
}
