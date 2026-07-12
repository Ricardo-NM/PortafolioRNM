export function getNextAutoSkillIndex(
  currentIndex: number | null,
  totalItems: number,
  random = Math.random,
) {
  if (totalItems <= 0) {
    return null;
  }

  if (totalItems === 1) {
    return 0;
  }

  const nextIndex = Math.floor(random() * totalItems);

  return nextIndex === currentIndex ? (nextIndex + 1) % totalItems : nextIndex;
}
