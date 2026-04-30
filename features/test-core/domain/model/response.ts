import type {
  ChoiceId,
  QuestionId,
} from "@/features/quiz/domain/model/question";

export type Response = {
  questionId: QuestionId;
  choiceId: ChoiceId;
};
