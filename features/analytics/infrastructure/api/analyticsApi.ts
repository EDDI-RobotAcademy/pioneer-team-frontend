import { httpClient } from "@/infrastructure/http/httpClient";
import type { FunnelMetricsResponse } from "@/features/analytics/domain/model/funnelMetric";

const FUNNEL_PATH = "/dashboard/analytics/funnel";

export const fetchFunnelMetrics = (): Promise<
  FunnelMetricsResponse | undefined
> => httpClient.get<FunnelMetricsResponse>(FUNNEL_PATH);
