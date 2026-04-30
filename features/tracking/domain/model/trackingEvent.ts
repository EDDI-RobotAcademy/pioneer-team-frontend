export type EventType =
  | "IMPRESSION"
  | "CLICK"
  | "SCROLL"
  | "CONVERT"
  | "SHARE"
  | "LAND";

export type TrackingEvent = {
  event_type: EventType;
  session_id: string;
  content_id: string;
  timestamp: number;
  referral_id?: string;
  metadata?: Record<string, unknown>;
};
