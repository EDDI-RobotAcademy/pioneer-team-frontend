import {
  validatePsychTest,
  type PsychTest,
} from "@/features/test-core/domain/model/psychTest";
import { CEO_QUESTIONS } from "@/features/serious-test/domain/data/questions/ceoQuestions";

export const CEO_TEST: PsychTest = {
  id: "ceo",
  contentId: "ceo_test",
  title: "내가 세계적인 CEO라면?",
  description: "어떤 인물의 유형일까?",
  estimatedMinutes: 3,
  questions: CEO_QUESTIONS,
  resultImageDir: "/images/serious/ceo",
  thumbnailPath: "/images/ceo/ceo_type.png",
};

if (process.env.NODE_ENV !== "production") {
  validatePsychTest(CEO_TEST);
}
