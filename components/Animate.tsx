import type { ReactNode } from "react";

type AnimateProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function Animate({
  children,
  className = "",
  delay = 0,
}: AnimateProps) {
  return (
    <div
      className={`animate-in ${className}`.trim()}
      data-visible="true"
      style={{ ["--delay" as string]: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
