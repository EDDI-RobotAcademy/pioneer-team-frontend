import { atom } from "jotai";
import {
  DEFAULT_PERIOD,
  type Period,
} from "@/features/analytics/domain/model/period";

export const periodAtom = atom<Period>(DEFAULT_PERIOD);
