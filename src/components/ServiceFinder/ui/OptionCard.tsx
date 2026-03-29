interface Props {
  label: string;
  subtitle?: string;
  selected?: boolean;
  onClick: () => void;
}

export default function OptionCard({ label, subtitle, selected, onClick }: Props) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      className={`sf-option ${selected ? 'sf-option--selected' : ''}`}
      onClick={onClick}
    >
      <span className="sf-option__label">{label}</span>
      {subtitle && <span className="sf-option__sub">{subtitle}</span>}
      {selected && (
        <svg className="sf-option__check" viewBox="0 0 20 20" fill="currentColor" width="20" height="20" aria-hidden="true">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  );
}
