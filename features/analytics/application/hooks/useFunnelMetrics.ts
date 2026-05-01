"use client";

import { useAtom, useAtomValue } from "jotai";
import { useCallback } from "react";
import { funnelAtom } from "@/features/analytics/application/atoms/funnelAtom";
import { periodAtom } from "@/features/analytics/application/atoms/periodAtom";
import { fetchFunnelMetrics } from "@/features/analytics/infrastructure/api/analyticsApi";

const ERROR_MESSAGES = {
  EMPTY: "데이터를 받지 못했어요.",
  GENERIC: "조회 중 오류가 발생했어요.",
};

export const useFunnelMetrics = () => {
  const [state, setState] = useAtom(funnelAtom);
  const period = useAtomValue(periodAtom);

  const refetch = useCallback(async (): Promise<void> => {
    setState({ status: "LOADING" });
    try {
      const data = await fetchFunnelMetrics(period);
      if (!data) {
        setState({ status: "FAILED", reason: ERROR_MESSAGES.EMPTY });
        return;
      }
      setState({ status: "SUCCESS", data });
    } catch {
      setState({ status: "FAILED", reason: ERROR_MESSAGES.GENERIC });
    }
  }, [setState, period]);

  return {
    state,
    isLoading: state.status === "IDLE" || state.status === "LOADING",
    isFailed: state.status === "FAILED",
    isSuccess: state.status === "SUCCESS",
    refetch,
  };
};
