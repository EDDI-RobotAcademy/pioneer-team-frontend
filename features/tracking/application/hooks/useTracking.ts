"use client";

import { useCallback } from "react";
import { dispatchTracking } from "@/features/tracking/application/commands/trackingCommand";

export const useTracking = () => {
  const trackClick = useCallback((contentId: string) => {
    dispatchTracking({ type: "TRACK_CLICK", contentId });
  }, []);

  return { trackClick };
};
