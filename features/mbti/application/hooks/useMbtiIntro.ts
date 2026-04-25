"use client";

import { useAtom, useAtomValue } from "jotai";
import { useCallback, useEffect } from "react";
import { introAtom } from "@/features/mbti/application/atoms/introAtom";
import {
  currentQuestionAtom,
  currentQuestionIndexAtom,
  isAnsweringAtom,
  isIntroVisibleAtom,
  responsesAtom,
  totalQuestionCountAtom,
} from "@/features/mbti/application/selectors/introSelectors";
import { dispatchIntroIntent } from "@/features/mbti/application/commands/introCommand";
import {
  enterIntro,
  selectChoice,
  startTest,
} from "@/features/mbti/domain/intent/introIntent";
import { EMPATHY_MBTI_TEST } from "@/features/mbti/domain/model/mbtiTest";
import { EMPATHY_TYPES } from "@/features/mbti/domain/model/empathyType";
import type {
  ChoiceId,
  QuestionId,
} from "@/features/quiz/domain/model/question";

export const useMbtiIntro = () => {
  const [state, setState] = useAtom(introAtom);
  const isIntroVisible = useAtomValue(isIntroVisibleAtom);
  const isAnswering = useAtomValue(isAnsweringAtom);
  const currentQuestion = useAtomValue(currentQuestionAtom);
  const currentQuestionIndex = useAtomValue(currentQuestionIndexAtom);
  const responses = useAtomValue(responsesAtom);
  const totalQuestionCount = useAtomValue(totalQuestionCountAtom);

  useEffect(() => {
    setState((prev) => dispatchIntroIntent(prev, enterIntro()));
  }, [setState]);

  const onStartTest = useCallback(() => {
    setState((prev) => dispatchIntroIntent(prev, startTest()));
  }, [setState]);

  const onSelectChoice = useCallback(
    (questionId: QuestionId, choiceId: ChoiceId) => {
      setState((prev) =>
        dispatchIntroIntent(prev, selectChoice(questionId, choiceId)),
      );
    },
    [setState],
  );

  return {
    state,
    test: EMPATHY_MBTI_TEST,
    empathyTypes: EMPATHY_TYPES,
    isIntroVisible,
    isAnswering,
    currentQuestion,
    currentQuestionIndex,
    totalQuestionCount,
    responses,
    onStartTest,
    onSelectChoice,
  };
};
