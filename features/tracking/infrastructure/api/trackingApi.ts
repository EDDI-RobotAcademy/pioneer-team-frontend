import { httpClient } from "@/infrastructure/http/httpClient";
import type { TrackingEvent } from "@/features/tracking/domain/model/trackingEvent";

const TRACKING_EVENT_PATH = "/events";

export const sendTrackingEvent = (
  event: TrackingEvent,
): Promise<unknown> => httpClient.post<unknown>(TRACKING_EVENT_PATH, event);
