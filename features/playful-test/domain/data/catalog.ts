import type { PsychTest } from "@/features/test-core/domain/model/psychTest";
import { CEO_TEST } from "@/features/playful-test/domain/data/tests/ceoTest";

export const PLAYFUL_TESTS: Record<string, PsychTest> = {
  [CEO_TEST.id]: CEO_TEST,
};

export const findPlayfulTest = (id: string): PsychTest | null =>
  PLAYFUL_TESTS[id] ?? null;
