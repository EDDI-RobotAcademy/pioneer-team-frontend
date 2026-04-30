const REQUIRED_ENV_KEYS = [
  "NEXT_PUBLIC_API_BASE_URL",
  "NEXT_PUBLIC_GOOGLE_LOGIN_PATH",
  "NEXT_PUBLIC_KAKAO_LOGIN_PATH",
] as const;

type EnvKey = (typeof REQUIRED_ENV_KEYS)[number];

function readEnv(): Record<EnvKey, string> {
  const missing: string[] = [];

  const entries = REQUIRED_ENV_KEYS.map((key) => {
    const value = process.env[key];
    if (!value) {
      missing.push(key);
    }
    return [key, value ?? ""] as const;
  });

  if (missing.length > 0) {
    throw new Error(
      `필수 환경 변수가 설정되지 않았습니다: ${missing.join(", ")}`,
    );
  }

  return Object.fromEntries(entries) as Record<EnvKey, string>;
}

const raw = readEnv();

export const env = {
  apiBaseUrl: raw.NEXT_PUBLIC_API_BASE_URL,
  googleLoginPath: raw.NEXT_PUBLIC_GOOGLE_LOGIN_PATH,
  kakaoLoginPath: raw.NEXT_PUBLIC_KAKAO_LOGIN_PATH,
};
