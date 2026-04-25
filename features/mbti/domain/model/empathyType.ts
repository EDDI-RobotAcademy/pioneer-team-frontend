export type EmpathyTypeId = "EMOTIONAL" | "COGNITIVE";

export type EmpathyType = {
  id: EmpathyTypeId;
  name: string;
  tagline: string;
  description: string;
  traits: ReadonlyArray<string>;
};

export const EMOTIONAL_EMPATHY: EmpathyType = {
  id: "EMOTIONAL",
  name: "감성적 공감",
  tagline: "마음으로 함께 느낀다",
  description:
    "타인의 감정을 즉각적으로 함께 느끼며, 위로와 정서적 지지를 통해 관계를 잇는 공감 방식이다.",
  traits: [
    "상대의 감정에 빠르게 동조한다",
    "위로와 공감의 언어를 우선한다",
    "분위기와 표정을 민감하게 읽는다",
    "관계의 정서적 깊이를 중시한다",
  ],
};

export const COGNITIVE_EMPATHY: EmpathyType = {
  id: "COGNITIVE",
  name: "인지적 공감",
  tagline: "관점으로 이해한다",
  description:
    "상대의 상황과 의도를 논리적으로 이해하고, 객관적 해석을 통해 적절한 도움을 찾는 공감 방식이다.",
  traits: [
    "상황의 맥락과 원인을 분석한다",
    "감정보다 의도를 먼저 파악한다",
    "현실적인 해결책을 제시한다",
    "거리를 두고 객관적으로 본다",
  ],
};

export const EMPATHY_TYPES: ReadonlyArray<EmpathyType> = [
  EMOTIONAL_EMPATHY,
  COGNITIVE_EMPATHY,
];
