const TOKEN_KEY = "auth.dashboard_gate_token";

export const readGateToken = (): string | null => {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

export const writeGateToken = (token: string): void => {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(TOKEN_KEY, token);
  } catch {
    /* noop */
  }
};

export const clearGateToken = (): void => {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    /* noop */
  }
};
