import type { Question } from "@/features/quiz/domain/model/question";

export type EmpathyQuestion = Question & {
  category: string;
};
