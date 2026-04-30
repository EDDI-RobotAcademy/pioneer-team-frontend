import { triggerDrain } from "@/features/tracking/infrastructure/queue/eventQueue";

export const registerQueueLifecycle = (): (() => void) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  const onVisibilityChange = (): void => {
    if (document.visibilityState === "hidden") {
      triggerDrain();
    }
  };

  const onOnline = (): void => {
    triggerDrain();
  };

  document.addEventListener("visibilitychange", onVisibilityChange);
  window.addEventListener("online", onOnline);

  return () => {
    document.removeEventListener("visibilitychange", onVisibilityChange);
    window.removeEventListener("online", onOnline);
  };
};
