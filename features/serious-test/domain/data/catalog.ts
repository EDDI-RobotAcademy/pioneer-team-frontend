import type { PsychTest } from "@/features/test-core/domain/model/psychTest";
import { CEO_TEST } from "@/features/serious-test/domain/data/tests/ceoTest";

export const SERIOUS_TESTS: Record<string, PsychTest> = {
  [CEO_TEST.id]: CEO_TEST,
};

export const findSeriousTest = (id: string): PsychTest | null =>
  SERIOUS_TESTS[id] ?? null;
