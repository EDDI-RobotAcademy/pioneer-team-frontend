export type CeoProfile = {
  name: string;
  company: string;
  description: string;
};

export const CEO_PROFILES: Record<string, CeoProfile> = {
  EXTREME_TI_TE: {
    name: "일론 머스크",
    company: "테슬라 · 스페이스X",
    description:
      "전기차 혁명을 일으킨 테슬라, 인류 최초로 재사용 로켓을 착륙시킨 스페이스X, 뇌-컴퓨터 인터페이스 뉴럴링크까지 만들어 낸 인물. 제1원리 사고로 산업의 룰을 다시 쓰고, 그걸 끝까지 밀어붙여 결국 세계 최고 부자 자리에 올랐다.",
  },
  EXTREME_TE: {
    name: "잭 웰치",
    company: "제너럴 일렉트릭",
    description:
      "GE 시가총액을 140억 달러에서 4,100억 달러로 약 30배 키운 \"20세기 최고의 CEO\". 성과 미달 하위 10%를 매년 잘라내는 \"중성자탄 잭\" 시스템으로, 결과 지향 경영의 교과서를 썼다.",
  },
  EXTREME_FE: {
    name: "하워드 슐츠",
    company: "스타벅스",
    description:
      "시애틀의 작은 커피숍을 86개국 38,000개 매장의 글로벌 브랜드로 키운 사람. \"제3의 공간\"이라는 개념을 창조했고, 파트너(직원) 전원에게 의료보험·주식까지 안긴 사람 중심 경영의 상징.",
  },
  EXTREME_TI: {
    name: "레이 달리오",
    company: "브리지워터 어소시에이츠",
    description:
      "세계 최대 헤지펀드(운용자산 1,700억 달러+)를 만든 사람. 2008 금융위기를 정확히 예측해 +9.5% 수익을 냈고, 자기 사고법을 정리한 《원칙(Principles)》은 글로벌 베스트셀러가 됐다.",
  },
  EXTREME_FI: {
    name: "이본 쉬나드",
    company: "파타고니아",
    description:
      "2022년 약 30억 달러 가치의 회사 전체를 지구에 기부한 등반가 출신 창업자. \"이 자켓을 사지 마세요\" 광고를 내면서 오히려 매출이 3배가 된, 신념을 절대 양보하지 않는 환경 경영의 살아있는 전설.",
  },
  TI_FI: {
    name: "손정의",
    company: "소프트뱅크",
    description:
      "알리바바에 2,000만 달러를 넣어 600억 달러로 키운 3,000배 수익 신화의 주인공. 1,000억 달러짜리 비전펀드를 조성해 전 세계 IT 판을 직접 짠 \"300년 비전\"의 베팅꾼.",
  },
  TI_FE: {
    name: "브라이언 체스키",
    company: "에어비앤비",
    description:
      "디자이너 출신으로 220개국 700만 개 숙소를 잇는 플랫폼을 만들고, 시가총액 1,000억 달러로 상장시킨 인물. 코로나로 매출 80% 빠지던 와중에 정면 돌파해 IPO까지 성사시킨 게스트·호스트 경험 설계자.",
  },
  TI_BALANCED: {
    name: "래리 페이지",
    company: "구글",
    description:
      "PageRank 알고리즘 하나로 검색의 패러다임 자체를 바꾼 엔지니어. 자율주행(웨이모), AI(딥마인드), 생명연장(칼리코)까지 묶어 알파벳이라는 거대 문샷 우산을 만들어냈다.",
  },
  TE_FI: {
    name: "팀 쿡",
    company: "애플",
    description:
      "애플을 인류 역사상 최초로 시가총액 3조 달러를 돌파한 회사로 만든 운영의 마법사. 재고 회전을 일주일 미만으로 끊어내면서, 프라이버시·다양성 같은 가치는 정부 앞에서도 꺾지 않는 신념파.",
  },
  TE_FE: {
    name: "사티아 나델라",
    company: "마이크로소프트",
    description:
      "취임 7년 만에 MS 시가총액을 3,000억에서 3조 달러 이상으로 10배 키운 부활의 기획자. 클라우드(Azure)·AI(OpenAI 파트너십) 전환을 \"공감\"이라는 무기와 함께 끌어낸 변혁가.",
  },
  TE_BALANCED: {
    name: "제프 베이조스",
    company: "아마존",
    description:
      "차고 인터넷 책방을 시가총액 1.7조 달러 회사로 키우고, AWS로 클라우드 시장 자체를 창조한 실행 머신. 블루 오리진으로 인류 민간 우주 시대까지 연 \"Day 1\" 집착가.",
  },
  BALANCED_FI: {
    name: "리드 헤이스팅스",
    company: "넷플릭스",
    description:
      "DVD 우편 대여 회사를 230개국 2.5억 가입자의 글로벌 스트리밍 제국으로 바꾼 인물. 휴가 무제한·승인 절차 폐지 \"규칙 없음\" 문화 덱은 실리콘밸리의 표준 운영체제가 됐다.",
  },
  BALANCED_FE: {
    name: "셰릴 샌드버그",
    company: "메타",
    description:
      "구글에서 광고 사업을 키우고 페이스북으로 옮겨 매출 1,000억 달러 광고 비즈니스를 설계한 양 빅테크 핵심. 《Lean In》으로 글로벌 여성 리더십 운동까지 만든 사람 중심 전략가.",
  },
  FULL_BALANCED: {
    name: "에릭 슈미트",
    company: "구글",
    description:
      "두 청년 창업자 옆에서 작은 검색 스타트업을 시가총액 2조 달러 회사로 키워낸 \"어른의 손\". 미국 정부 AI·국방 자문까지 맡으며 기술과 정책을 잇는 가장 균형 잡힌 종합형 경영자.",
  },
};

export const findCeoProfile = (typeCode: string): CeoProfile | null =>
  CEO_PROFILES[typeCode] ?? null;
