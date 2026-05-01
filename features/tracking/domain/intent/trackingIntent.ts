export type TrackingIntent =
  | { type: "TRACK_START"; contentId: string }
  | {
      type: "TRACK_CONVERT";
      contentId: string;
      metadata?: Record<string, unknown>;
    };
