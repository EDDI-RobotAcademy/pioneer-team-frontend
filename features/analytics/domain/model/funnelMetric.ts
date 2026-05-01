export type FunnelEventType = "LAND" | "IMPRESSION" | "START" | "CONVERT";

export type FunnelStageMetric = {
  event_type: FunnelEventType | string;
  count: number;
  conversion_rate?: number;
};

export type FunnelMetricsResponse = {
  stages: readonly FunnelStageMetric[];
  overall_conversion_rate?: number;
};
