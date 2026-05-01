const VERIFIED_KEY = "auth.dashboard_verified";

export const readGateVerified = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(VERIFIED_KEY) === "true";
  } catch {
    return false;
  }
};

export const writeGateVerified = (verified: boolean): void => {
  if (typeof window === "undefined") return;
  try {
    if (verified) {
      window.sessionStorage.setItem(VERIFIED_KEY, "true");
    } else {
      window.sessionStorage.removeItem(VERIFIED_KEY);
    }
  } catch {
    /* noop */
  }
};

export const clearGateVerified = (): void => {
  writeGateVerified(false);
};
