export const CEO_TEST_PAGE_CONTENT_ID = "ceo_test";
export const CEO_TEST_HERO_CONTENT_ID = "ceo_test_hero";
export const CEO_TEST_START_BUTTON_CONTENT_ID = "ceo_test_start_button";

export const ceoTestQuestionContentId = (questionId: string): string =>
  `ceo_test_question_${questionId}`;

export const ceoTestResultContentId = (resultTypeId: string): string =>
  `ceo_result_${resultTypeId.toLowerCase()}`;
