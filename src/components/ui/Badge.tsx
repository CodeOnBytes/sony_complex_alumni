import type { ReactNode } from "react";
import { CapIcon } from "./Icons";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="badge"><CapIcon />{children}</span>
  );
}

