"use client";

import { useAtom, useAtomValue } from "jotai";
import { useCallback, useEffect } from "react";
import { introAtom } from "@/features/mbti/application/atoms/introAtom";
import { resultAtom } from "@/features/mbti/application/atoms/resultAtom";
import {
  currentQuestionAtom,
  currentQuestionIndexAtom,
  isAnsweringAtom,
  isCompletedAtom,
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
import { submitMbti } from "@/features/mbti/infrastructure/api/submissionApi";
import { CEO_TEST_PAGE_CONTENT_ID } from "@/features/tracking/domain/contentId";
import type {
  ChoiceId,
  QuestionId,
} from "@/features/quiz/domain/model/question";

export const useMbtiIntro = () => {
  const [state, setState] = useAtom(introAtom);
  const [result, setResult] = useAtom(resultAtom);
  const isIntroVisible = useAtomValue(isIntroVisibleAtom);
  const isAnswering = useAtomValue(isAnsweringAtom);
  const isCompleted = useAtomValue(isCompletedAtom);
  const currentQuestion = useAtomValue(currentQuestionAtom);
  const currentQuestionIndex = useAtomValue(currentQuestionIndexAtom);
  const responses = useAtomValue(responsesAtom);
  const totalQuestionCount = useAtomValue(totalQuestionCountAtom);

  useEffect(() => {
    setState((prev) => dispatchIntroIntent(prev, enterIntro()));
  }, [setState]);

  useEffect(() => {
    if (state.status !== "COMPLETED") return;
    if (result.status !== "IDLE") return;
    setResult({ status: "SUBMITTING" });
    submitMbti(CEO_TEST_PAGE_CONTENT_ID, state.responses)
      .then((response) => {
        if (!response) {
          setResult({ status: "FAILED" });
          return;
        }
        setResult({
          status: "SUCCESS",
          typeCode: response.type_code,
          description: response.description,
        });
      })
      .catch(() => setResult({ status: "FAILED" }));
  }, [state, result.status, setResult]);

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
    isIntroVisible,
    isAnswering,
    isCompleted,
    currentQuestion,
    currentQuestionIndex,
    totalQuestionCount,
    responses,
    result,
    onStartTest,
    onSelectChoice,
  };
};
