import { useState } from 'react';
import type { Question } from '../../../data/service-finder/types';
import CheckboxItem from '../ui/CheckboxItem';

interface Props {
  heading: string;
  hint: string;
  questions: Question[];
  submitLabel: string;
  onSubmit: (questionIds: string[]) => void;
}

export default function QuestionsStep({ heading, hint, questions, submitLabel, onSubmit }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="sf-step">
      <h2 className="sf-step__heading">{heading}</h2>
      <p className="sf-step__hint">{hint}</p>
      <div className="sf-questions" role="group" aria-label={heading}>
        {questions.map(q => (
          <CheckboxItem
            key={q.id}
            id={q.id}
            text={q.text}
            checked={selected.has(q.id)}
            onChange={toggle}
          />
        ))}
      </div>
      <button
        type="button"
        className="sf-submit"
        disabled={selected.size === 0}
        onClick={() => onSubmit(Array.from(selected))}
      >
        {submitLabel}
      </button>
    </div>
  );
}
