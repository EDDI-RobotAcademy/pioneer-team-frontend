import { httpClient } from "@/infrastructure/http/httpClient";
import type { Response } from "@/features/mbti/domain/model/response";

export type SubmissionResponse = {
  type_code: string;
  description: string;
};

const toAnswerLetter = (choiceId: string): string =>
  choiceId.slice(-1).toUpperCase();

export const submitMbti = (
  contentId: string,
  responses: readonly Response[],
): Promise<SubmissionResponse | undefined> =>
  httpClient.post<SubmissionResponse>(
    `/contents/${contentId}/submissions`,
    {
      test_id: contentId,
      answers: responses.map((r) => toAnswerLetter(r.choiceId)),
    },
  );
