const RAW = {
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_GOOGLE_LOGIN_PATH: process.env.NEXT_PUBLIC_GOOGLE_LOGIN_PATH,
  NEXT_PUBLIC_KAKAO_LOGIN_PATH: process.env.NEXT_PUBLIC_KAKAO_LOGIN_PATH,
} as const;

const missing = (Object.keys(RAW) as Array<keyof typeof RAW>).filter(
  (key) => !RAW[key],
);

if (missing.length > 0) {
  throw new Error(
    `필수 환경 변수가 설정되지 않았습니다: ${missing.join(", ")}`,
  );
}

export const env = {
  apiBaseUrl: RAW.NEXT_PUBLIC_API_BASE_URL as string,
  googleLoginPath: RAW.NEXT_PUBLIC_GOOGLE_LOGIN_PATH as string,
  kakaoLoginPath: RAW.NEXT_PUBLIC_KAKAO_LOGIN_PATH as string,
};
