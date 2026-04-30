import {
  isValidChoiceCount,
  type Question,
} from "@/features/quiz/domain/model/question";

export type PsychTestId = string;

export type PsychTest = {
  id: PsychTestId;
  contentId: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  questions: readonly Question[];
  resultImageDir: string;
  thumbnailPath?: string;
};

export const validatePsychTest = (test: PsychTest): void => {
  if (test.questions.length === 0) {
    throw new Error(`PsychTest ${test.id}: 질문이 비어 있습니다`);
  }
  for (const q of test.questions) {
    if (!isValidChoiceCount(q.choices.length)) {
      throw new Error(
        `PsychTest ${test.id}, question ${q.id}: 선택지가 ${q.choices.length}개 (허용: 2~5)`,
      );
    }
    for (let i = 0; i < q.choices.length; i++) {
      const expected = `-${String.fromCharCode(97 + i)}`;
      if (!q.choices[i].id.endsWith(expected)) {
        throw new Error(
          `PsychTest ${test.id}, choice ${q.choices[i].id}: 컨벤션 위반 (예상 끝: ${expected})`,
        );
      }
    }
  }
};
