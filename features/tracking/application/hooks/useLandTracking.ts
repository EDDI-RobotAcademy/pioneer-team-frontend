"use client";

import { useEffect, useRef } from "react";
import type { TrackingEvent } from "@/features/tracking/domain/model/trackingEvent";
import { ensureSessionId } from "@/features/tracking/infrastructure/session/sessionStorage";
import { readReferralId } from "@/features/tracking/infrastructure/referral/referralQuery";
import { sendTrackingEvent } from "@/features/tracking/infrastructure/api/trackingApi";

type Params = {
  contentId: string;
};

export const useLandTracking = ({ contentId }: Params): void => {
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;

    const event: TrackingEvent = {
      event_type: "LAND",
      session_id: ensureSessionId(),
      content_id: contentId,
      timestamp: Date.now(),
    };

    const referralId = readReferralId(window.location.search);
    if (referralId !== undefined) {
      event.referral_id = referralId;
    }

    void sendTrackingEvent(event);
  }, [contentId]);
};
