import { atom } from "jotai";
import {
  INITIAL_INTRO_STATE,
  type IntroState,
} from "@/features/mbti/domain/state/introState";

export const introAtom = atom<IntroState>(INITIAL_INTRO_STATE);
