export type FunnelEventType = "LAND" | "IMPRESSION" | "START" | "CONVERT";

export type FunnelStageMetric = {
  event_type: FunnelEventType | string;
  count: number;
  conversion_rate?: number;
  previous_count?: number;
  delta_rate?: number | null;
};

export type FunnelMetricsResponse = {
  stages: readonly FunnelStageMetric[];
  overall_conversion_rate?: number;
};
