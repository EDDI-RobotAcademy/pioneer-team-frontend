import type { TestFlowIntent } from "@/features/test-core/domain/intent/testFlowIntent";
import type { TestFlowState } from "@/features/test-core/domain/state/testFlowState";

type CommandMap = {
  [K in TestFlowIntent["type"]]: (
    state: TestFlowState,
    intent: Extract<TestFlowIntent, { type: K }>,
  ) => TestFlowState;
};

export const testFlowCommand: CommandMap = {
  ENTER_TEST: () => ({ status: "READY" }),
  START_TEST: (_, intent) => ({
    status: "ANSWERING",
    currentIndex: 0,
    totalQuestions: intent.totalQuestions,
    responses: [],
  }),
  SELECT_CHOICE: (state, intent) => {
    if (state.status !== "ANSWERING") return state;
    const responses = [
      ...state.responses,
      { questionId: intent.questionId, choiceId: intent.choiceId },
    ];
    const nextIndex = state.currentIndex + 1;
    if (nextIndex >= state.totalQuestions) {
      return { status: "COMPLETED", responses };
    }
    return {
      status: "ANSWERING",
      currentIndex: nextIndex,
      totalQuestions: state.totalQuestions,
      responses,
    };
  },
};

export const dispatchTestFlowIntent = (
  state: TestFlowState,
  intent: TestFlowIntent,
): TestFlowState => {
  type Fn = (s: TestFlowState, i: TestFlowIntent) => TestFlowState;
  return (testFlowCommand[intent.type] as Fn)(state, intent);
};
