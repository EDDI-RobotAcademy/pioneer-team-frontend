"use client";

import { useEffect, useRef } from "react";
import type { TrackingEvent } from "@/features/tracking/domain/model/trackingEvent";
import { ensureSessionId } from "@/features/tracking/infrastructure/session/sessionStorage";
import {
  hasImpressionFired,
  markImpressionFired,
} from "@/features/tracking/infrastructure/session/impressionCache";
import { sendTrackingEvent } from "@/features/tracking/infrastructure/api/trackingApi";

type Params = {
  contentId: string;
  threshold?: number;
};

export const useImpressionTracking = <T extends Element>({
  contentId,
  threshold = 0.5,
}: Params) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (hasImpressionFired(contentId)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (hasImpressionFired(contentId)) {
            observer.disconnect();
            return;
          }
          markImpressionFired(contentId);
          const event: TrackingEvent = {
            event_type: "IMPRESSION",
            session_id: ensureSessionId(),
            content_id: contentId,
            timestamp: Date.now(),
          };
          void sendTrackingEvent(event);
          observer.disconnect();
          return;
        }
      },
      { threshold },
    );
    observer.observe(target);

    return () => observer.disconnect();
  }, [contentId, threshold]);

  return ref;
};
