export type TrackingIntent =
  | { type: "TRACK_CLICK"; contentId: string }
  | {
      type: "TRACK_CONVERT";
      contentId: string;
      metadata?: Record<string, unknown>;
    };
