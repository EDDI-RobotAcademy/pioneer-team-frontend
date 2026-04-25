import { atom } from "jotai";
import { introAtom } from "@/features/mbti/application/atoms/introAtom";

export const isIntroVisibleAtom = atom(
  (get) => get(introAtom).status === "READY",
);

export const isStartingTestAtom = atom(
  (get) => get(introAtom).status === "STARTING",
);
