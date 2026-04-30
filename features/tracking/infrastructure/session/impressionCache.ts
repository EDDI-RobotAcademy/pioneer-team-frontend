const FIRED_KEY = "tracking.impression_fired";

const inMemory = new Set<string>();
let initialized = false;

const readPersisted = (): readonly string[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.sessionStorage.getItem(FIRED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((v): v is string => typeof v === "string");
  } catch {
    return [];
  }
};

const writePersisted = (): void => {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(FIRED_KEY, JSON.stringify([...inMemory]));
  } catch {
    // noop
  }
};

const ensureLoaded = (): void => {
  if (initialized) return;
  initialized = true;
  for (const id of readPersisted()) {
    inMemory.add(id);
  }
};

export const hasImpressionFired = (contentId: string): boolean => {
  ensureLoaded();
  return inMemory.has(contentId);
};

export const markImpressionFired = (contentId: string): void => {
  ensureLoaded();
  if (inMemory.has(contentId)) return;
  inMemory.add(contentId);
  writePersisted();
};
