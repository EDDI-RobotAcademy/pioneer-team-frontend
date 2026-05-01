# DATA_TRACKING.md (Frontend)

이 문서는 Frontend에서 Tracking Event를 어떻게 생성하고 전송해야 하는지를 정의한다.

Tracking System은 사용자 행동을 기록하는 것이 아니라  
행동 데이터(Event)를 정확하게 생성하여 Backend로 전달하는 것에 목적이 있다.

Frontend는 Tracking System에서 Producer 역할을 가진다.

---

# 1. 목적

Frontend Tracking의 목적은 다음과 같다.

- 사용자 행동을 Event 단위로 생성한다
- Event를 일관된 Schema로 구성한다
- Event를 Backend로 전송한다

Frontend는 데이터를 해석하지 않는다.

---

# 2. 책임 범위

Frontend의 책임은 다음 3가지로 제한된다.

1. Event 생성
2. Event Payload 구성
3. Event 전송

이 외의 모든 처리(분석, 상태 전이, 퍼널 계산)는 Backend 책임이다.

---

# 3. Event Schema

모든 Event는 다음 필드를 반드시 포함해야 한다.

    event_type   : string
    session_id   : string
    content_id   : string
    timestamp    : number (ms)

Optional 필드:

    referral_id  : string
    metadata     : Record<string, any>

---

# 4. Event Type 정의

사용 가능한 Event Type:

    IMPRESSION
    CLICK
    START
    SCROLL
    CONVERT
    SHARE
    LAND

정의:

- IMPRESSION: 콘텐츠가 화면에 노출됨
- CLICK: 사용자가 콘텐츠를 클릭함 (일반 인터랙션)
- START: 사용자가 테스트/플로우 시작 액션을 수행함 (시작 버튼 등)
- SCROLL: 콘텐츠를 의미 있게 탐색함
- CONVERT: 목표 행동 수행
- SHARE: 공유 발생
- LAND: 외부 유입으로 페이지 진입

---

# 5. Event 생성 규칙

MUST:

- 모든 사용자 행동은 Event로 변환되어야 한다
- Event는 발생 즉시 생성되어야 한다
- Event는 변형 없이 전송되어야 한다

금지:

- 여러 Event를 합쳐서 전송 금지
- Event를 수정하거나 가공 금지
- Event를 조건적으로 누락 금지

---

# 6. session_id 규칙

MUST:

- session_id는 클라이언트에서 생성한다
- session_id는 모든 Event에 포함되어야 한다
- session_id는 세션 동안 동일해야 한다

생성 방식 예시:

    uuid v4

저장 위치:

- localStorage 또는 cookie

---

# 7. content_id 규칙

MUST:

- 모든 Event는 content_id를 포함해야 한다
- content_id는 추적 대상 콘텐츠의 고유 식별자이다

예시:

    mbti_result_001
    article_123
    landing_A

---

# 8. timestamp 규칙

MUST:

- timestamp는 Event 발생 시점 기준이어야 한다
- 단위는 milliseconds (Date.now)

---

# 9. Event 전송 규칙

MUST:

- Event는 Backend API로 전송해야 한다
- 전송 실패 시 재시도 전략을 가져야 한다

권장:

- debounce / batching 사용 가능
- queue 기반 전송 권장

---

# 10. Tracking Flow (Frontend)

    User Action
       ↓
    Event 생성
       ↓
    Payload 구성
       ↓
    Backend 전송

---

# 11. 절대 금지 규칙

Frontend는 다음을 절대 수행하면 안 된다.

- 상태 전이 판단 (CLICK → SCROLL 등)
- Journey 구성
- Funnel 계산 (CTR, CR 등)
- Event 기반 조건 분기 로직

---

# 12. 설계 원칙

- Event는 atomic 해야 한다
- Event는 immutable 해야 한다
- Event는 독립적으로 해석 가능해야 한다

---

# 13. 예시

CLICK Event:

    {
      "event_type": "CLICK",
      "session_id": "abc-123",
      "content_id": "mbti_card_1",
      "timestamp": 1714450000000
    }

SHARE Event:

    {
      "event_type": "SHARE",
      "session_id": "abc-123",
      "content_id": "mbti_result_1",
      "referral_id": "ref-999",
      "timestamp": 1714450001000
    }

---

# 14. 최종 원칙

- Frontend는 Event를 생성하는 시스템이다
- 의미 해석은 Backend에서 수행한다
- Event 품질이 Tracking 품질을 결정한다