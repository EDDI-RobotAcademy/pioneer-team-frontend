import { atom } from "jotai";

export type TestResultState =
  | { status: "IDLE" }
  | { status: "SUBMITTING" }
  | { status: "SUCCESS"; typeCode: string; description: string }
  | { status: "FAILED" };

export const resultAtom = atom<TestResultState>({ status: "IDLE" });
