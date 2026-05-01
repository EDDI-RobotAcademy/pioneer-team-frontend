"use client";

import { useAtom } from "jotai";
import { useCallback } from "react";
import { contentSelectionAtom } from "@/features/analytics/application/atoms/contentSelectionAtom";
import {
  contentSelectionEquals,
  type ContentSelection,
} from "@/features/analytics/domain/model/contentSelection";

export const useContentFilter = () => {
  const [selection, setSelection] = useAtom(contentSelectionAtom);

  const select = useCallback(
    (next: ContentSelection): boolean => {
      if (contentSelectionEquals(selection, next)) return false;
      setSelection(next);
      return true;
    },
    [selection, setSelection],
  );

  return { selection, select };
};
