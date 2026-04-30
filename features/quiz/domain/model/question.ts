export type ChoiceId = string;

export type Choice = {
  id: ChoiceId;
  text: string;
};

export type QuestionId = string;

export type Question = {
  id: QuestionId;
  text: string;
  choices: readonly Choice[];
  category?: string;
};

const VALID_CHOICE_COUNTS = [2, 3, 4, 5] as const;

export const isValidChoiceCount = (n: number): boolean =>
  (VALID_CHOICE_COUNTS as readonly number[]).includes(n);

export const choiceIdLetter = (choiceId: string): string =>
  choiceId.slice(-1).toUpperCase();
