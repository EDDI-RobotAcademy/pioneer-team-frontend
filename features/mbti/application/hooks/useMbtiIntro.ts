"use client";

import { useAtom, useAtomValue } from "jotai";
import { useCallback, useEffect } from "react";
import { introAtom } from "@/features/mbti/application/atoms/introAtom";
import {
  isIntroVisibleAtom,
  isStartingTestAtom,
} from "@/features/mbti/application/selectors/introSelectors";
import { dispatchIntroIntent } from "@/features/mbti/application/commands/introCommand";
import {
  enterIntro,
  startTest,
} from "@/features/mbti/domain/intent/introIntent";
import { EMPATHY_MBTI_TEST } from "@/features/mbti/domain/model/mbtiTest";
import { EMPATHY_TYPES } from "@/features/mbti/domain/model/empathyType";

export const useMbtiIntro = () => {
  const [state, setState] = useAtom(introAtom);
  const isIntroVisible = useAtomValue(isIntroVisibleAtom);
  const isStarting = useAtomValue(isStartingTestAtom);

  useEffect(() => {
    setState((prev) => dispatchIntroIntent(prev, enterIntro()));
  }, [setState]);

  const onStartTest = useCallback(() => {
    setState((prev) => dispatchIntroIntent(prev, startTest()));
  }, [setState]);

  return {
    state,
    test: EMPATHY_MBTI_TEST,
    empathyTypes: EMPATHY_TYPES,
    isIntroVisible,
    isStarting,
    onStartTest,
  };
};
