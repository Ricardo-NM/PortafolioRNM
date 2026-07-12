export function ViewportGuideLine({
  position,
  scope,
}: {
  position: "top" | "bottom";
  scope:
    | "experience"
    | "experience-detail"
    | "profile"
    | "projects"
    | "skills"
    | "github-activity";
}) {
  const verticalPosition = position === "top" ? "top-0" : "bottom-0";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute left-1/2 z-50 h-0 w-screen -translate-x-1/2 ${verticalPosition}`}
    >
      <div
        className={`${scope}-guide-line blueprint-mask-x absolute left-0 top-0 z-20 h-[2px] w-full -translate-y-1/2 text-foreground opacity-[0.18]`}
      />
      <span
        className={`${scope}-guide-dot blueprint-dot absolute top-0 -translate-x-1/2 -translate-y-1/2 left-[var(--content-left)]`}
      />
      <span
        className={`${scope}-guide-dot blueprint-dot absolute top-0 -translate-x-1/2 -translate-y-1/2 left-[var(--content-right)]`}
      />
    </div>
  );
}
