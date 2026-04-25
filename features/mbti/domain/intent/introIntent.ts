export type IntroIntent =
  | { type: "ENTER_INTRO" }
  | { type: "START_TEST" };

export const enterIntro = (): IntroIntent => ({ type: "ENTER_INTRO" });
export const startTest = (): IntroIntent => ({ type: "START_TEST" });
