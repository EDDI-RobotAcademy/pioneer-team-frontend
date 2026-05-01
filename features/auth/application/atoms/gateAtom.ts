import { atom } from "jotai";
import {
  INITIAL_GATE_STATE,
  type GateState,
} from "@/features/auth/domain/state/gateState";

export const gateAtom = atom<GateState>(INITIAL_GATE_STATE);
