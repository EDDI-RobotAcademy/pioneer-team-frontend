import { atom } from "jotai";
import { introAtom } from "@/features/mbti/application/atoms/introAtom";
import { EMPATHY_QUESTIONS } from "@/features/mbti/domain/data/empathyQuestions";

export const isIntroVisibleAtom = atom(
  (get) => get(introAtom).status === "READY",
);

export const isAnsweringAtom = atom(
  (get) => get(introAtom).status === "ANSWERING",
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
