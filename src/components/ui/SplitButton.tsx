import type { ReactNode } from "react";
import { Arrow } from "./Icons";

interface BtnProps { children: ReactNode; href?: string; variant?: "maroon" | "navy" | "outline" }
export function SplitButton({ children, href = "#", variant = "maroon" }: BtnProps) {
  return (
    <a className={`split-btn ${variant}`} href={href}>
      <span className="split-btn__label">{children}</span>
      <span className="split-btn__icon"><Arrow /></span>
    </a>
  );
}

