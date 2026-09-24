/**
 * Deterministic shuffle: the same `seed` always gives the same order.
 *
 * Quiz options are displayed in a shuffled order so the correct answer isn't
 * predictably in one position. Using a seed (the question id) instead of
 * Math.random() means the server and browser render the same order — no
 * hydration mismatch — and every student sees a consistent layout.
 */
function hash(text: string): number {
  // FNV-1a: a tiny, well-known string hash
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // Final "mixing" step (from MurmurHash3) so similar strings get very different numbers
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
}

export function seededShuffle<T>(items: T[], seed: string, key: (item: T) => string): T[] {
  return [...items].sort((a, b) => hash(seed + key(a)) - hash(seed + key(b)));
}
