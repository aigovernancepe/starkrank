import type { RoleOption } from '../../../data/service-finder/types';
import OptionCard from '../ui/OptionCard';

interface Props {
  heading: string;
  options: RoleOption[];
  onSelect: (roleId: string) => void;
}

export default function RoleStep({ heading, options, onSelect }: Props) {
  return (
    <div className="sf-step" role="radiogroup" aria-label={heading}>
      <h2 className="sf-step__heading">{heading}</h2>
      <div className="sf-grid">
        {options.map(opt => (
          <OptionCard
            key={opt.id}
            label={opt.label}
            subtitle={opt.subtitle}
            onClick={() => onSelect(opt.id)}
          />
        ))}
      </div>
    </div>
  );
}
