import { atom } from "jotai";

export type MbtiResultState =
  | { status: "IDLE" }
  | { status: "SUBMITTING" }
  | { status: "SUCCESS"; typeCode: string; description: string }
  | { status: "FAILED" };

export const resultAtom = atom<MbtiResultState>({ status: "IDLE" });
