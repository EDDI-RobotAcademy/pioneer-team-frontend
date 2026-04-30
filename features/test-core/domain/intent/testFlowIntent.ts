import type {
  ChoiceId,
  QuestionId,
} from "@/features/quiz/domain/model/question";

export type TestFlowIntent =
  | { type: "ENTER_TEST" }
  | { type: "START_TEST"; totalQuestions: number }
  | { type: "SELECT_CHOICE"; questionId: QuestionId; choiceId: ChoiceId };

export const enterTest = (): TestFlowIntent => ({ type: "ENTER_TEST" });

export const startTest = (totalQuestions: number): TestFlowIntent => ({
  type: "START_TEST",
  totalQuestions,
});

export const selectChoice = (
  questionId: QuestionId,
  choiceId: ChoiceId,
): TestFlowIntent => ({
  type: "SELECT_CHOICE",
  questionId,
  choiceId,
});
