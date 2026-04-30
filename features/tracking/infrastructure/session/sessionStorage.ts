const SESSION_ID_KEY = "tracking.session_id";

const generateSessionId = (): string => {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
};

export const ensureSessionId = (): string => {
  if (typeof window === "undefined") {
    return generateSessionId();
  }
  const existing = window.localStorage.getItem(SESSION_ID_KEY);
  if (existing) {
    return existing;
  }
  const next = generateSessionId();
  window.localStorage.setItem(SESSION_ID_KEY, next);
  return next;
};
