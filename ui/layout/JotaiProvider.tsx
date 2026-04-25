"use client";

import { Provider } from "jotai";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const JotaiProvider = ({ children }: Props) => {
  return <Provider>{children}</Provider>;
};
