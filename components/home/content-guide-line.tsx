export function ContentGuideLine({
  position,
  className = "",
  centerDot = false,
  lineClassName = "experience-detail-local-guide-line",
  dotClassName = "experience-detail-guide-dot",
}: {
  position: "top" | "middle" | "bottom";
  className?: string;
  centerDot?: boolean;
  lineClassName?: string;
  dotClassName?: string;
}) {
  const verticalPosition =
    position === "top"
      ? "top-0"
      : position === "middle"
        ? "top-1/2"
        : "bottom-0";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 z-50 h-0 w-full ${verticalPosition} ${className}`}
    >
      <div
        className={`${lineClassName} blueprint-mask-x absolute left-0 top-0 z-20 h-[2px] w-full -translate-y-1/2 text-foreground opacity-[0.18]`}
      />
      <span
        className={`${dotClassName} blueprint-dot absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2`}
      />
      {centerDot ? (
        <span
          className={`${dotClassName} blueprint-dot absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2`}
        />
      ) : null}
      <span
        className={`${dotClassName} blueprint-dot absolute right-0 top-0 translate-x-1/2 -translate-y-1/2`}
      />
    </div>
  );
}
