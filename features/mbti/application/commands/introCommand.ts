import type { IntroIntent } from "@/features/mbti/domain/intent/introIntent";
import type { IntroState } from "@/features/mbti/domain/state/introState";
import { EMPATHY_QUESTIONS } from "@/features/mbti/domain/data/empathyQuestions";

type IntroCommandMap = {
  [K in IntroIntent["type"]]: (
    state: IntroState,
    intent: Extract<IntroIntent, { type: K }>,
  ) => IntroState;
};

export const introCommand: IntroCommandMap = {
  ENTER_INTRO: () => ({ status: "READY" }),
  START_TEST: () => ({
    status: "ANSWERING",
    currentIndex: 0,
    responses: [],
  }),
  SELECT_CHOICE: (state, intent) => {
    if (state.status !== "ANSWERING") return state;
    const responses = [
      ...state.responses,
      { questionId: intent.questionId, choiceId: intent.choiceId },
    ];
    const nextIndex = state.currentIndex + 1;
    if (nextIndex >= EMPATHY_QUESTIONS.length) {
      return { status: "COMPLETED", responses };
    }
    return {
      status: "ANSWERING",
      currentIndex: nextIndex,
      responses,
    };
  },
};

export const dispatchIntroIntent = (
  state: IntroState,
  intent: IntroIntent,
): IntroState => {
  type CommandFn = (s: IntroState, i: IntroIntent) => IntroState;
  return (introCommand[intent.type] as CommandFn)(state, intent);
};
