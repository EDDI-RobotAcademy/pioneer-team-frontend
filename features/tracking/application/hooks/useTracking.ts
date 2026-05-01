"use client";

import { useCallback } from "react";
import { dispatchTracking } from "@/features/tracking/application/commands/trackingCommand";

export const useTracking = () => {
  const trackStart = useCallback((contentId: string) => {
    dispatchTracking({ type: "TRACK_START", contentId });
  }, []);

  return { trackStart };
};
