interface Props {
  id: string;
  text: string;
  checked: boolean;
  onChange: (id: string) => void;
}

export default function CheckboxItem({ id, text, checked, onChange }: Props) {
  return (
    <label className={`sf-checkbox ${checked ? 'sf-checkbox--checked' : ''}`}>
      <input
        type="checkbox"
        className="sf-checkbox__input"
        checked={checked}
        onChange={() => onChange(id)}
        aria-label={text}
      />
      <span className="sf-checkbox__box" aria-hidden="true">
        {checked && (
          <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </span>
      <span className="sf-checkbox__text">{text}</span>
    </label>
  );
}
