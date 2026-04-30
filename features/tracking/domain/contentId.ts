export const heroContentId = (testContentId: string): string =>
  `${testContentId}_hero`;

export const startButtonContentId = (testContentId: string): string =>
  `${testContentId}_start_button`;

export const questionContentId = (
  testContentId: string,
  questionId: string,
): string => `${testContentId}_question_${questionId}`;

export const resultContentId = (
  testContentId: string,
  resultTypeCode: string,
): string => `${testContentId}_result_${resultTypeCode.toLowerCase()}`;
