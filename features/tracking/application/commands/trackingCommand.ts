import type { TrackingIntent } from "@/features/tracking/domain/intent/trackingIntent";
import { ensureSessionId } from "@/features/tracking/infrastructure/session/sessionStorage";
import { sendTrackingEvent } from "@/features/tracking/infrastructure/api/trackingApi";

type CommandMap = {
  [K in TrackingIntent["type"]]: (
    intent: Extract<TrackingIntent, { type: K }>,
  ) => void;
};

const commands: CommandMap = {
  TRACK_START: (intent) => {
    sendTrackingEvent({
      event_type: "START",
      session_id: ensureSessionId(),
      content_id: intent.contentId,
      timestamp: Date.now(),
    });
  },
  TRACK_CONVERT: (intent) => {
    sendTrackingEvent({
      event_type: "CONVERT",
      session_id: ensureSessionId(),
      content_id: intent.contentId,
      timestamp: Date.now(),
      ...(intent.metadata ? { metadata: intent.metadata } : {}),
    });
  },
};

export const dispatchTracking = (intent: TrackingIntent): void => {
  const handler = commands[intent.type] as (i: TrackingIntent) => void;
  handler(intent);
};
