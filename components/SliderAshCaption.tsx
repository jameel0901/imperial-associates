"use client";

import {
  Children,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type AnimationEvent,
  type CSSProperties,
  type ReactNode,
} from "react";

const LINE_STAGGER_OUT_MS = 52;

/** Per-line pixel mask (enter) */
const PIXEL_ROWS = 2;
const PIXEL_COLS = 14;
const PIXEL_STAGGER_MS = 14;
const PIXEL_TILE_MS = 130;
/** Extra delay before each line’s pixels start (cascading lines) */
const PIXEL_LINE_BASE_MS = 72;

function vecOut(seed: number, lineIndex: number) {
  const s = seed * 23 + lineIndex * 17 + 99;
  const r = (n: number) => {
    const x = Math.sin(s * 0.01 + n * 3) * 10000;
    return x - Math.floor(x);
  };
  return {
    tx: (r(1) - 0.5) * 150,
    ty: -35 - r(2) * 110,
    rot: (r(3) - 0.5) * 28,
  };
}

function toSeed(animationKey: string | number): number {
  if (typeof animationKey === "number") return animationKey * 9973;
  return animationKey.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
}

type Props = {
  animationKey: string | number;
  isExiting: boolean;
  reducedMotion: boolean;
  onExitComplete?: () => void;
  className?: string;
  children: ReactNode;
};

export default function SliderAshCaption({
  animationKey,
  isExiting,
  reducedMotion,
  onExitComplete,
  className = "",
  children,
}: Props) {
  const lines = Children.toArray(children);
  const seed = toSeed(animationKey);
  const exitDoneRef = useRef(false);
  const [pixelRevealed, setPixelRevealed] = useState(false);

  useLayoutEffect(() => {
    if (reducedMotion || isExiting) {
      setPixelRevealed(true);
      return;
    }
    setPixelRevealed(false);
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setPixelRevealed(true));
    });
    return () => cancelAnimationFrame(id);
  }, [animationKey, reducedMotion, isExiting]);

  useEffect(() => {
    if (!isExiting || reducedMotion) return;
    exitDoneRef.current = false;
    const t = window.setTimeout(() => {
      if (!exitDoneRef.current) {
        exitDoneRef.current = true;
        onExitComplete?.();
      }
    }, 1600);
    return () => window.clearTimeout(t);
  }, [isExiting, reducedMotion, onExitComplete]);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`ash-caption-root ${className}`}>
      {lines.map((child, i) => {
        const vout = vecOut(seed, i);
        const cells = PIXEL_ROWS * PIXEL_COLS;
        const linePixelBase = i * PIXEL_LINE_BASE_MS;

        if (isExiting) {
          return (
            <div
              key={`ash-line-${i}`}
              className="ash-caption-line ash-caption-line--exit"
              style={
                {
                  "--line-i": i,
                  "--stagger-out": `${LINE_STAGGER_OUT_MS}ms`,
                  "--tx-out": `${vout.tx}px`,
                  "--ty-out": `${vout.ty}px`,
                  "--rot-out": `${vout.rot}deg`,
                } as CSSProperties
              }
              onAnimationEnd={(e: AnimationEvent<HTMLDivElement>) => {
                if (e.target !== e.currentTarget) return;
                if (i !== lines.length - 1) return;
                const name = e.animationName || "";
                if (!name.includes("ashCaptionFlyOut")) return;
                if (exitDoneRef.current) return;
                exitDoneRef.current = true;
                onExitComplete?.();
              }}
            >
              <div className="ash-caption-line__inner">{child}</div>
            </div>
          );
        }

        return (
          <div
            key={`ash-line-${i}`}
            className={`ash-caption-line ash-caption-line--pixel${pixelRevealed ? " ash-caption-line--pixel-revealed" : ""}`}
          >
            <div className="ash-caption-line__inner">{child}</div>
            <div
              className="pixel-line-grid"
              aria-hidden
              style={
                {
                  gridTemplateRows: `repeat(${PIXEL_ROWS}, 1fr)`,
                  gridTemplateColumns: `repeat(${PIXEL_COLS}, 1fr)`,
                } as CSSProperties
              }
            >
              {Array.from({ length: cells }).map((_, j) => {
                const row = Math.floor(j / PIXEL_COLS);
                const col = j % PIXEL_COLS;
                const delay = linePixelBase + (row + col) * PIXEL_STAGGER_MS;
                return (
                  <span
                    key={`px-${i}-${j}`}
                    className="pixel-line-tile"
                    style={
                      {
                        "--pixel-d": `${delay}ms`,
                        "--pixel-dur": `${PIXEL_TILE_MS}ms`,
                      } as CSSProperties
                    }
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
