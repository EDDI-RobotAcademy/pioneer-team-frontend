"use client";

import type {
  Choice,
  ChoiceId,
  Question,
} from "@/features/quiz/domain/model/question";

type Props = {
  question: Question;
  onSelect: (choice: Choice) => void;
  selectedChoiceId?: ChoiceId;
  isLocked?: boolean;
};

export const QuestionTemplate = ({
  question,
  onSelect,
  selectedChoiceId,
  isLocked = false,
}: Props) => {
  return (
    <section className="flex w-full max-w-xl flex-col gap-6">
      <h2 className="text-center text-2xl font-black leading-snug tracking-tight text-zinc-900 sm:text-3xl">
        {question.text}
      </h2>
      <ul className="flex flex-col gap-3">
        {question.choices.map((choice) => {
          const isSelected = selectedChoiceId === choice.id;
          return (
            <li key={choice.id}>
              <button
                type="button"
                onClick={() => onSelect(choice)}
                disabled={isLocked}
                aria-pressed={isSelected}
                className={`w-full rounded-2xl border-2 px-5 py-4 text-left text-base font-bold transition-colors ${
                  isSelected
                    ? "border-[#6667AB] bg-[#6667AB]/10 text-[#6667AB]"
                    : "border-zinc-200 bg-white text-zinc-700 hover:border-[#6667AB] hover:bg-[#6667AB]/5"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                {choice.text}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
