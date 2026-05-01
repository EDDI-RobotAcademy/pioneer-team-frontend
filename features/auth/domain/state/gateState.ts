export type LockedDetail = {
  isSubmitting: boolean;
  errorMessage: string | null;
};

export type GateState =
  | { status: "IDLE" }
  | { status: "LOCKED"; detail: LockedDetail }
  | { status: "UNLOCKED" };

export const INITIAL_LOCKED_DETAIL: LockedDetail = {
  isSubmitting: false,
  errorMessage: null,
};

export const INITIAL_GATE_STATE: GateState = { status: "IDLE" };
