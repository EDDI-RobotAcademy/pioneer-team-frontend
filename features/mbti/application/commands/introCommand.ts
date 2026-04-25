import type { IntroIntent } from "@/features/mbti/domain/intent/introIntent";
import type { IntroState } from "@/features/mbti/domain/state/introState";

type IntroCommandMap = {
  [K in IntroIntent["type"]]: (state: IntroState) => IntroState;
};

export const introCommand: IntroCommandMap = {
  ENTER_INTRO: () => ({ status: "READY" }),
  START_TEST: () => ({ status: "ANSWERING", currentIndex: 0 }),
};

export const dispatchIntroIntent = (
  state: IntroState,
  intent: IntroIntent,
): IntroState => introCommand[intent.type](state);
