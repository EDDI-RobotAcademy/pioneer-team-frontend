"use client";

import { useEffect } from "react";
import { registerQueueLifecycle } from "@/features/tracking/infrastructure/queue/queueLifecycle";

export const QueueLifecycleProvider = () => {
  useEffect(() => {
    const cleanup = registerQueueLifecycle();
    return cleanup;
  }, []);
  return null;
};
