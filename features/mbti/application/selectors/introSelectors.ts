import { atom } from "jotai";
import { introAtom } from "@/features/mbti/application/atoms/introAtom";
import { EMPATHY_QUESTIONS } from "@/features/mbti/domain/data/empathyQuestions";
import type { Response } from "@/features/mbti/domain/model/response";

export const isIntroVisibleAtom = atom(
  (get) => get(introAtom).status === "READY",
);

export const isAnsweringAtom = atom(
  (get) => get(introAtom).status === "ANSWERING",
);

export const isCompletedAtom = atom(
  (get) => get(introAtom).status === "COMPLETED",
);

export const currentQuestionIndexAtom = atom((get) => {
  const state = get(introAtom);
  return state.status === "ANSWERING" ? state.currentIndex : -1;
});

export const currentQuestionAtom = atom((get) => {
  const index = get(currentQuestionIndexAtom);
  if (index < 0 || index >= EMPATHY_QUESTIONS.length) return null;
  return EMPATHY_QUESTIONS[index];
});

export const responsesAtom = atom<readonly Response[]>((get) => {
  const state = get(introAtom);
  if (state.status === "ANSWERING" || state.status === "COMPLETED") {
    return state.responses;
  }
  return [];
});

export const totalQuestionCountAtom = atom(() => EMPATHY_QUESTIONS.length);
