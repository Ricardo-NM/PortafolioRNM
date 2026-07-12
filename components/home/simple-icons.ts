const techIconColorByTheme = {
  light: {
    base: "71717a",
    hover: "18181b",
  },
  dark: {
    base: "a1a1aa",
    hover: "fff",
  },
} as const;

export function getSimpleIconUrl(
  iconSlug: string,
  theme: keyof typeof techIconColorByTheme,
  state: keyof (typeof techIconColorByTheme)["light"],
) {
  return `https://cdn.simpleicons.org/${iconSlug}/${techIconColorByTheme[theme][state]}`;
}
