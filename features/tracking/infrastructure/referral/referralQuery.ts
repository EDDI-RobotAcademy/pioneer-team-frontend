const REFERRAL_QUERY_KEY = "referral_id";

export const readReferralId = (search: string): string | undefined => {
  const params = new URLSearchParams(search);
  const value = params.get(REFERRAL_QUERY_KEY);
  return value ?? undefined;
};
