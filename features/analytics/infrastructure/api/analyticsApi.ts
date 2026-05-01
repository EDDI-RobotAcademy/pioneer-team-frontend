import { httpClient } from "@/infrastructure/http/httpClient";
import type { FunnelMetricsResponse } from "@/features/analytics/domain/model/funnelMetric";
import type { Period } from "@/features/analytics/domain/model/period";
import type { ContentSelection } from "@/features/analytics/domain/model/contentSelection";

const FUNNEL_PATH = "/dashboard/analytics/funnel";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const dateToStartMs = (date: string): number => new Date(date).getTime();

const dateToExclusiveEndMs = (date: string): number =>
  new Date(date).getTime() + ONE_DAY_MS;

const buildQueryString = (
  period: Period,
  content: ContentSelection,
): string => {
  const params = new URLSearchParams();
  if (period.type === "preset") {
    params.set("period", period.preset);
  } else {
    params.set("start", String(dateToStartMs(period.from)));
    params.set("end", String(dateToExclusiveEndMs(period.to)));
  }
  if (content.type === "single") {
    params.set("content_id", content.contentId);
  }
  const query = params.toString();
  return query ? `?${query}` : "";
};

export const fetchFunnelMetrics = (
  period: Period,
  content: ContentSelection,
): Promise<FunnelMetricsResponse | undefined> =>
  httpClient.get<FunnelMetricsResponse>(
    `${FUNNEL_PATH}${buildQueryString(period, content)}`,
  );
