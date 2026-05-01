import { atom } from "jotai";
import {
  DEFAULT_CONTENT_SELECTION,
  type ContentSelection,
} from "@/features/analytics/domain/model/contentSelection";

export const contentSelectionAtom = atom<ContentSelection>(
  DEFAULT_CONTENT_SELECTION,
);
