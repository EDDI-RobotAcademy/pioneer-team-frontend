export type GateState =
  | { status: "IDLE" }
  | { status: "LOCKED" }
  | { status: "UNLOCKED"; token: string };

export const INITIAL_GATE_STATE: GateState = { status: "IDLE" };
