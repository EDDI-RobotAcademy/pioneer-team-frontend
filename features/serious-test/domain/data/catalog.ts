import type { PsychTest } from "@/features/test-core/domain/model/psychTest";

export const SERIOUS_TESTS: Record<string, PsychTest> = {};

export const findSeriousTest = (id: string): PsychTest | null =>
  SERIOUS_TESTS[id] ?? null;
