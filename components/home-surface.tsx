import Image from "next/image";

import profilePicture from "@/assets/images/profilePicture.jpeg";
import { Blueprint } from "@/components/blueprint";
import { ThemeBanner } from "@/components/theme-banner";

export function HomeSurface() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-background text-foreground">
      <Blueprint />

      <header className="content-column relative">
        <ThemeBanner />

        <div className="profile-section relative flex flex-col items-center bg-background px-3 pb-5 text-center">
          <div className="relative z-30 -mt-3 h-[clamp(4.75rem,18vw,5.75rem)] w-[clamp(4.75rem,18vw,5.75rem)] shrink-0 rounded-lg bg-border p-px">
            <Image
              src={profilePicture}
              alt="Ricardo Nava Mayoral"
              priority
              sizes="(min-width: 768px) 8vw, 22vw"
              className="h-full w-full rounded-md object-cover"
            />
          </div>

          <div className="mt-3 min-w-0">
            <h1 className="truncate text-xs font-semibold uppercase leading-none">
              Ricardo Nava Mayoral
            </h1>
            <p className="mt-2 truncate font-mono text-[11px] leading-none text-muted-foreground">
              Desarrollador Full Stack
            </p>
          </div>
        </div>
      </header>
    </main>
  );
}
