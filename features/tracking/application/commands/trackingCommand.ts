import type { TrackingIntent } from "@/features/tracking/domain/intent/trackingIntent";
import { ensureSessionId } from "@/features/tracking/infrastructure/session/sessionStorage";
import { sendTrackingEvent } from "@/features/tracking/infrastructure/api/trackingApi";

type CommandMap = {
  [K in TrackingIntent["type"]]: (
    intent: Extract<TrackingIntent, { type: K }>,
  ) => void;
};

const commands: CommandMap = {
  TRACK_CLICK: (intent) => {
    sendTrackingEvent(
      {
        event_type: "CLICK",
        session_id: ensureSessionId(),
        content_id: intent.contentId,
        timestamp: Date.now(),
      },
      { useBeacon: true },
    );
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
