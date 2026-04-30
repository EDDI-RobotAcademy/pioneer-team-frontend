import { atom } from "jotai";
import {
  INITIAL_TEST_FLOW_STATE,
  type TestFlowState,
} from "@/features/test-core/domain/state/testFlowState";

export const testFlowAtom = atom<TestFlowState>(INITIAL_TEST_FLOW_STATE);
