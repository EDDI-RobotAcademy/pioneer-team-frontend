export type IntroState =
  | { status: "IDLE" }
  | { status: "READY" }
  | { status: "STARTING" };

export const INITIAL_INTRO_STATE: IntroState = { status: "IDLE" };
