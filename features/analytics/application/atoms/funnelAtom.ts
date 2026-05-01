import { atom } from "jotai";
import type { FunnelMetricsResponse } from "@/features/analytics/domain/model/funnelMetric";

export type FunnelState =
  | { status: "IDLE" }
  | { status: "LOADING" }
  | { status: "SUCCESS"; data: FunnelMetricsResponse }
  | { status: "FAILED"; reason: string };

export const funnelAtom = atom<FunnelState>({ status: "IDLE" });
