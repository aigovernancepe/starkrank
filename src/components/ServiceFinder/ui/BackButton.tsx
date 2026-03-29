interface Props {
  onClick: () => void;
  label?: string;
}

export default function BackButton({ onClick, label = 'Back' }: Props) {
  return (
    <button type="button" className="sf-back" onClick={onClick} aria-label={label}>
      <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
      {label}
    </button>
  );
}
