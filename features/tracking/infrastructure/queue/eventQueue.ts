import type { TrackingEvent } from "@/features/tracking/domain/model/trackingEvent";

const QUEUE_KEY = "tracking.event_queue";
const MAX_ATTEMPTS = 5;
const MAX_BACKOFF_MS = 30_000;

type QueuedItem = {
  event: TrackingEvent;
  attempts: number;
};

let queue: QueuedItem[] = [];
let initialized = false;
let processing = false;
let processor: ((event: TrackingEvent) => Promise<void>) | null = null;

const load = (): void => {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(QUEUE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      queue = parsed.filter(
        (x): x is QueuedItem =>
          x &&
          typeof x === "object" &&
          "event" in x &&
          "attempts" in x,
      );
    }
  } catch {
    /* noop */
  }
};

const persist = (): void => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch {
    /* noop */
  }
};

const ensureInit = (): void => {
  if (initialized) return;
  initialized = true;
  load();
};

const backoff = (attempts: number): number =>
  Math.min(MAX_BACKOFF_MS, 1_000 * Math.pow(2, attempts));

const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const drain = async (): Promise<void> => {
  if (processing) return;
  if (!processor) return;
  processing = true;
  try {
    while (queue.length > 0) {
      const head = queue[0];
      try {
        await processor(head.event);
        queue.shift();
        persist();
      } catch {
        head.attempts += 1;
        persist();
        if (head.attempts >= MAX_ATTEMPTS) {
          queue.shift();
          persist();
          continue;
        }
        await wait(backoff(head.attempts));
      }
    }
  } finally {
    processing = false;
  }
};

export const registerEventProcessor = (
  fn: (event: TrackingEvent) => Promise<void>,
): void => {
  ensureInit();
  processor = fn;
  void drain();
};

export const enqueueEvent = (event: TrackingEvent): void => {
  ensureInit();
  queue.push({ event, attempts: 0 });
  persist();
  void drain();
};

export const triggerDrain = (): void => {
  ensureInit();
  void drain();
};
