export type MbtiTest = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  estimatedMinutes: number;
};

export const EMPATHY_MBTI_TEST: MbtiTest = {
  id: "empathy-type",
  title: "당신은 어떤 공감을 하나요?",
  subtitle: "감성적 공감 vs 인지적 공감",
  description:
    "사람마다 마음을 나누는 방식이 달라요. 몇 가지 질문에 답하다 보면, 당신이 어떤 공감을 하는 사람인지 살짝 알아볼 수 있어요.",
  estimatedMinutes: 3,
};
