import { httpClient } from "@/infrastructure/http/httpClient";
import type {
  FunnelMetricsResponse,
  FunnelStageMetric,
} from "@/features/analytics/domain/model/funnelMetric";

const FUNNEL_PATH = "/dashboard/analytics/funnel";

type RawStage = {
  stage?: string;
  event_type?: string;
  count: number;
  conversion_rate?: number;
};

type RawResponse = {
  stages?: RawStage[];
  overall_conversion_rate?: number;
};

const normalizeStages = (
  raw: readonly RawStage[],
): readonly FunnelStageMetric[] =>
  raw.map((s) => ({
    event_type: s.event_type ?? s.stage ?? "",
    count: s.count,
    conversion_rate: s.conversion_rate,
  }));

export const fetchFunnelMetrics = async (): Promise<
  FunnelMetricsResponse | undefined
> => {
  const raw = await httpClient.get<RawResponse>(FUNNEL_PATH);
  if (!raw) return undefined;
  return {
    stages: normalizeStages(raw.stages ?? []),
    overall_conversion_rate: raw.overall_conversion_rate,
  };
};
