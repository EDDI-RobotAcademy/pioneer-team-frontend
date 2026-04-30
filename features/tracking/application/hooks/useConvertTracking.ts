"use client";

import { useEffect, useRef } from "react";
import { dispatchTracking } from "@/features/tracking/application/commands/trackingCommand";

type Params = {
  contentId: string;
  metadata?: Record<string, unknown>;
};

export const useConvertTracking = ({ contentId, metadata }: Params): void => {
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    dispatchTracking({ type: "TRACK_CONVERT", contentId, metadata });
  }, [contentId, metadata]);
};
