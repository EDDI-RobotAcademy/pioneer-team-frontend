import { httpClient } from "@/infrastructure/http/httpClient";
import { choiceIdLetter } from "@/features/quiz/domain/model/question";
import type { Response } from "@/features/test-core/domain/model/response";
import type { SubmissionApiResponse } from "@/features/test-core/domain/model/psychTestResult";

export const submitPsychTest = (
  contentId: string,
  responses: readonly Response[],
): Promise<SubmissionApiResponse | undefined> =>
  httpClient.post<SubmissionApiResponse>(
    `/contents/${contentId}/submissions`,
    {
      test_id: contentId,
      answers: responses.map((r) => choiceIdLetter(r.choiceId)),
    },
  );
