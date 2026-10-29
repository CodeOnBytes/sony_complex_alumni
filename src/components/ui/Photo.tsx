import type { CSSProperties, ReactNode } from "react";

/** Background image with a gradient fallback, so the layout still looks right before photos are added. */
export function Photo({ src, className = "", style, children }: { src: string; className?: string; style?: CSSProperties; children?: ReactNode }) {
  return (
    <div className={`photo ${className}`} style={{ backgroundImage: `url(${src}), linear-gradient(135deg,#d9d2c7,#a99f91)`, ...style }}>
      {children}
    </div>
  );
}

