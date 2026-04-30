import type { Response } from "@/features/test-core/domain/model/response";

export type TestFlowState =
  | { status: "IDLE" }
  | { status: "READY" }
  | {
      status: "ANSWERING";
      currentIndex: number;
      totalQuestions: number;
      responses: readonly Response[];
    }
  | {
      status: "COMPLETED";
      responses: readonly Response[];
    };

export const INITIAL_TEST_FLOW_STATE: TestFlowState = { status: "IDLE" };
