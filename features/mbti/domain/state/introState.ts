export type IntroState =
  | { status: "IDLE" }
  | { status: "READY" }
  | { status: "ANSWERING"; currentIndex: number };

export const INITIAL_INTRO_STATE: IntroState = { status: "IDLE" };
