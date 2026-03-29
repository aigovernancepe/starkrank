import type { ServiceCardCopy } from '../../../data/service-finder/types';
import { ServiceIcon } from './ServiceIcon';

interface Props {
  serviceId: string;
  icon: string;
  copy: ServiceCardCopy;
  link: string;
  rank: number;
  onCtaClick: (serviceId: string, ctaType: string) => void;
}

export default function ServiceResultCard({ serviceId, icon, copy, link, rank, onCtaClick }: Props) {
  return (
    <div className={`sf-result-card ${rank === 0 ? 'sf-result-card--primary' : ''}`}>
      <div className="sf-result-card__icon">
        <ServiceIcon name={icon} />
      </div>
      <div className="sf-result-card__body">
        <h3 className="sf-result-card__headline">{copy.headline}</h3>
        <p className="sf-result-card__desc">{copy.description}</p>
        <a
          href={link}
          className="sf-result-card__cta"
          onClick={() => onCtaClick(serviceId, copy.ctaText.toLowerCase().includes('free') || copy.ctaText.toLowerCase().includes('gratis') || copy.ctaText.toLowerCase().includes('kostenlos') ? 'free_check' : 'learn_more')}
        >
          {copy.ctaText} &rarr;
        </a>
      </div>
    </div>
  );
}
