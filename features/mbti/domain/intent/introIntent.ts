import type {
  ChoiceId,
  QuestionId,
} from "@/features/quiz/domain/model/question";

export type IntroIntent =
  | { type: "ENTER_INTRO" }
  | { type: "START_TEST" }
  | { type: "SELECT_CHOICE"; questionId: QuestionId; choiceId: ChoiceId };

export const enterIntro = (): IntroIntent => ({ type: "ENTER_INTRO" });
export const startTest = (): IntroIntent => ({ type: "START_TEST" });
export const selectChoice = (
  questionId: QuestionId,
  choiceId: ChoiceId,
): IntroIntent => ({ type: "SELECT_CHOICE", questionId, choiceId });
