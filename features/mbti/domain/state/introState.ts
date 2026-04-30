import type { Response } from "@/features/mbti/domain/model/response";

export type IntroState =
  | { status: "IDLE" }
  | { status: "READY" }
  | {
      status: "ANSWERING";
      currentIndex: number;
      responses: readonly Response[];
    }
  | {
      status: "COMPLETED";
      responses: readonly Response[];
    };

export const INITIAL_INTRO_STATE: IntroState = { status: "IDLE" };
