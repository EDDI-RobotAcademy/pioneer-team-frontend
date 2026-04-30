import type { PsychTest } from "@/features/test-core/domain/model/psychTest";

export const PLAYFUL_TESTS: Record<string, PsychTest> = {};

export const findPlayfulTest = (id: string): PsychTest | null =>
  PLAYFUL_TESTS[id] ?? null;
