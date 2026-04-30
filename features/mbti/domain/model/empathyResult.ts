import type { Response } from "@/features/mbti/domain/model/response";
import type { EmpathyTypeId } from "@/features/mbti/domain/model/empathyType";

const COGNITIVE_CHOICE_SUFFIXES = ["-a", "-b"];

const isCognitiveChoice = (choiceId: string): boolean =>
  COGNITIVE_CHOICE_SUFFIXES.some((suffix) => choiceId.endsWith(suffix));

export const calcEmpathyType = (
  responses: readonly Response[],
): EmpathyTypeId => {
  let cognitive = 0;
  let emotional = 0;
  for (const response of responses) {
    if (isCognitiveChoice(response.choiceId)) {
      cognitive += 1;
    } else {
      emotional += 1;
    }
  }
  return cognitive >= emotional ? "COGNITIVE" : "EMOTIONAL";
};
