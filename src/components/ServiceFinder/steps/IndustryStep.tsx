import type { IndustryOption } from '../../../data/service-finder/types';
import OptionCard from '../ui/OptionCard';

interface Props {
  heading: string;
  options: IndustryOption[];
  onSelect: (industryId: string) => void;
}

export default function IndustryStep({ heading, options, onSelect }: Props) {
  return (
    <div className="sf-step" role="radiogroup" aria-label={heading}>
      <h2 className="sf-step__heading">{heading}</h2>
      <div className="sf-grid">
        {options.map(opt => (
          <OptionCard
            key={opt.id}
            label={opt.label}
            onClick={() => onSelect(opt.id)}
          />
        ))}
      </div>
    </div>
  );
}
