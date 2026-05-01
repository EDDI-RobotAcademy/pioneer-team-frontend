"use client";

import { useAtom } from "jotai";
import { useCallback } from "react";
import { periodAtom } from "@/features/analytics/application/atoms/periodAtom";
import {
  periodEquals,
  type Period,
} from "@/features/analytics/domain/model/period";

export const usePeriodFilter = () => {
  const [period, setPeriod] = useAtom(periodAtom);

  const select = useCallback(
    (next: Period): boolean => {
      if (periodEquals(period, next)) return false;
      setPeriod(next);
      return true;
    },
    [period, setPeriod],
  );

  return { period, select };
};
