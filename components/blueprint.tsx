import type { CSSProperties } from "react";

const verticalLines = [
  "left-[var(--content-left)]",
  "left-[var(--content-right)]",
];
const horizontalLines = [
  "top-[var(--banner-height)]",
  "top-[calc(var(--banner-height)+var(--profile-height))]",
];

const lineStyle: CSSProperties = {
  opacity: 0.18,
};

export function Blueprint() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20"
    >
      {verticalLines.map((position) => (
        <div
          key={position}
          className={`blueprint-mask-y absolute top-0 h-full w-[2px] -translate-x-1/2 text-foreground ${position}`}
          style={lineStyle}
        />
      ))}

      {horizontalLines.map((position) => (
        <div
          key={position}
          className={`blueprint-mask-x absolute left-0 h-[2px] w-full -translate-y-1/2 text-foreground ${position}`}
          style={lineStyle}
        />
      ))}

      {verticalLines.flatMap((left) =>
        horizontalLines.map((top) => (
          <span
            key={`${left}-${top}`}
            className={`blueprint-dot absolute h-[2px] w-[2px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/45 ${left} ${top}`}
          />
        )),
      )}
    </div>
  );
}
