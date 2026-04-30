export const MBTI_INTRO_PAGE_CONTENT_ID = "mbti_intro";
export const MBTI_INTRO_HERO_CONTENT_ID = "mbti_intro_hero";
export const MBTI_INTRO_START_BUTTON_CONTENT_ID = "mbti_intro_start_button";

export const mbtiQuestionContentId = (questionId: string): string =>
  `mbti_question_${questionId}`;

export const mbtiResultContentId = (empathyTypeId: string): string =>
  `mbti_result_${empathyTypeId.toLowerCase()}`;
