export type ChoiceId = string;

export type Choice = {
  id: ChoiceId;
  text: string;
};

export type QuestionId = string;

export type Question = {
  id: QuestionId;
  text: string;
  choices: readonly [Choice, Choice, Choice, Choice];
};
