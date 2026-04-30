import { httpClient } from "@/infrastructure/http/httpClient";
import { env } from "@/infrastructure/config/env";
import type { TrackingEvent } from "@/features/tracking/domain/model/trackingEvent";
import {
  enqueueEvent,
  registerEventProcessor,
} from "@/features/tracking/infrastructure/queue/eventQueue";

const TRACKING_EVENT_PATH = "/events";

type SendOptions = {
  useBeacon?: boolean;
};

const tryBeacon = (event: TrackingEvent): boolean => {
  if (typeof navigator === "undefined") return false;
  if (typeof navigator.sendBeacon !== "function") return false;
  const url = `${env.apiBaseUrl}${TRACKING_EVENT_PATH}`;
  const blob = new Blob([JSON.stringify(event)], {
    type: "application/json",
  });
  try {
    return navigator.sendBeacon(url, blob);
  } catch {
    return false;
  }
};

const directSend = async (event: TrackingEvent): Promise<void> => {
  await httpClient.post(TRACKING_EVENT_PATH, event);
};

registerEventProcessor(directSend);

export const sendTrackingEvent = (
  event: TrackingEvent,
  options?: SendOptions,
): void => {
  if (options?.useBeacon && tryBeacon(event)) {
    return;
  }
  directSend(event).catch(() => {
    enqueueEvent(event);
  });
};
