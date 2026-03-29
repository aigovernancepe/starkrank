interface Props {
  current: number;
  total: number;
  onNavigate: (step: number) => void;
}

export default function StepIndicator({ current, total, onNavigate }: Props) {
  return (
    <nav className="sf-steps" aria-label="Progress">
      <ol className="sf-steps__list">
        {Array.from({ length: total }, (_, i) => {
          const step = i + 1;
          const isCompleted = step < current;
          const isCurrent = step === current;
          return (
            <li key={step} className="sf-steps__item">
              {i > 0 && (
                <span
                  className={`sf-steps__line ${step <= current ? 'sf-steps__line--active' : ''}`}
                  aria-hidden="true"
                />
              )}
              <button
                type="button"
                className={`sf-steps__dot ${isCurrent ? 'sf-steps__dot--current' : ''} ${isCompleted ? 'sf-steps__dot--completed' : ''}`}
                onClick={() => isCompleted && onNavigate(step)}
                disabled={!isCompleted}
                aria-current={isCurrent ? 'step' : undefined}
                aria-label={`Step ${step}${isCurrent ? ' (current)' : ''}${isCompleted ? ' (completed)' : ''}`}
              >
                {step}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
