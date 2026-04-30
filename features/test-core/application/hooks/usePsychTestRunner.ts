"use client";

import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";
import type { PsychTest } from "@/features/test-core/domain/model/psychTest";
import { testFlowAtom } from "@/features/test-core/application/atoms/testFlowAtom";
import { resultAtom } from "@/features/test-core/application/atoms/resultAtom";
import { dispatchTestFlowIntent } from "@/features/test-core/application/commands/testFlowCommand";
import {
  enterTest,
  selectChoice,
  startTest,
} from "@/features/test-core/domain/intent/testFlowIntent";
import { submitPsychTest } from "@/features/test-core/infrastructure/api/submissionApi";
import type {
  ChoiceId,
  QuestionId,
} from "@/features/quiz/domain/model/question";

export const usePsychTestRunner = (test: PsychTest) => {
  const [state, setState] = useAtom(testFlowAtom);
  const [result, setResult] = useAtom(resultAtom);

  useEffect(() => {
    setState((prev) => dispatchTestFlowIntent(prev, enterTest()));
  }, [setState]);

  useEffect(() => {
    if (state.status !== "COMPLETED") return;
    if (result.status !== "IDLE") return;
    setResult({ status: "SUBMITTING" });
    submitPsychTest(test.contentId, state.responses)
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
  }, [state, result.status, setResult, test.contentId]);

  const onStartTest = useCallback(() => {
    setState((prev) =>
      dispatchTestFlowIntent(prev, startTest(test.questions.length)),
    );
  }, [setState, test.questions.length]);

  const onSelectChoice = useCallback(
    (questionId: QuestionId, choiceId: ChoiceId) => {
      setState((prev) =>
        dispatchTestFlowIntent(prev, selectChoice(questionId, choiceId)),
      );
    },
    [setState],
  );

  const isReady = state.status === "READY";
  const isAnswering = state.status === "ANSWERING";
  const isCompleted = state.status === "COMPLETED";

  const currentIndex =
    state.status === "ANSWERING" ? state.currentIndex : -1;
  const currentQuestion =
    state.status === "ANSWERING"
      ? test.questions[state.currentIndex] ?? null
      : null;
  const responses =
    state.status === "ANSWERING" || state.status === "COMPLETED"
      ? state.responses
      : [];

  return {
    test,
    state,
    result,
    isReady,
    isAnswering,
    isCompleted,
    currentQuestion,
    currentIndex,
    totalQuestionCount: test.questions.length,
    responses,
    onStartTest,
    onSelectChoice,
  };
};
