export type ToggleableTheme = string | undefined;

export function getNextTheme(theme: ToggleableTheme): "light" | "dark" {
  return theme === "dark" ? "light" : "dark";
}
