export const memojiImages = [
  "/memoji.png",
  "/memoji2.png",
  "/memoji3.png",
  "/memoji4.png",
  "/memoji5.png",
];

/** Pick a random index different from `current`. */
export function nextMemoji(current: number): number {
  if (memojiImages.length <= 1) return current;
  let next = current;
  while (next === current) {
    next = Math.floor(Math.random() * memojiImages.length);
  }
  return next;
}
