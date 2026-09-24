/**
 * Hand-written "probabilities" for the Next-Word Predictor lab.
 * They are illustrative only — invented to show how generation works,
 * not measured from a real language model.
 */

export type Candidate = [word: string, probability: number];

export const PROMPT = "The best way to study for a test is to";

/** Keyed by the words generated so far (joined with spaces). */
export const BY_CONTEXT: Record<string, Candidate[]> = {
  "": [["practice", 0.34], ["start", 0.26], ["review", 0.22], ["sleep", 0.08]],
  practice: [["with", 0.41], ["old", 0.27], ["every", 0.18], ["explaining", 0.06]],
  "practice with": [["flashcards", 0.38], ["friends", 0.29], ["past", 0.2], ["a", 0.08]],
  "practice with past": [["exams", 0.52], ["tests", 0.3], ["papers", 0.12], ["mistakes", 0.04]],
  "practice with a": [["friend", 0.44], ["timer", 0.25], ["partner", 0.2], ["tutor", 0.06]],
  "practice old": [["tests", 0.48], ["problems", 0.31], ["quizzes", 0.15], ["habits", 0.03]],
  "practice every": [["day", 0.62], ["night", 0.18], ["topic", 0.12], ["problem", 0.05]],
  "practice explaining": [["ideas", 0.4], ["it", 0.35], ["concepts", 0.15], ["answers", 0.05]],
  start: [["early", 0.55], ["with", 0.2], ["by", 0.15], ["now", 0.06]],
  "start with": [["the", 0.45], ["your", 0.25], ["what", 0.18], ["snacks", 0.04]],
  "start with the": [["hardest", 0.4], ["basics", 0.35], ["notes", 0.15], ["ending", 0.05]],
  "start by": [["reviewing", 0.44], ["making", 0.3], ["reading", 0.16], ["asking", 0.06]],
  review: [["your", 0.5], ["notes", 0.25], ["the", 0.15], ["mistakes", 0.06]],
  "review your": [["notes", 0.52], ["mistakes", 0.23], ["homework", 0.15], ["textbook", 0.06]],
  "review the": [["material", 0.46], ["chapter", 0.3], ["slides", 0.16], ["weather", 0.02]],
  sleep: [["well", 0.45], ["early", 0.3], ["eight", 0.12], ["in", 0.08]],
  "sleep eight": [["hours", 0.9], ["times", 0.05], ["days", 0.03], ["minutes", 0.01]],
  "sleep in": [["class", 0.35], [".", 0.3], ["late", 0.25], ["the", 0.05]],
};

/** Fallback when the full context isn't listed: look only at the last word. */
export const BY_LAST_WORD: Record<string, Candidate[]> = {
  and: [["take", 0.35], ["review", 0.3], ["rest", 0.2], ["quiz", 0.1]],
  take: [["breaks", 0.6], ["notes", 0.3], ["naps", 0.06], ["a", 0.02]],
  every: [["day", 0.7], ["night", 0.15], ["week", 0.1], ["hour", 0.04]],
  your: [["notes", 0.55], ["mistakes", 0.25], ["friends", 0.12], ["dog", 0.03]],
  the: [["notes", 0.4], ["chapter", 0.3], ["textbook", 0.2], ["moon", 0.02]],
  a: [["friend", 0.45], ["plan", 0.3], ["timer", 0.15], ["nap", 0.05]],
  making: [["flashcards", 0.55], ["a", 0.25], ["notes", 0.15], ["noise", 0.02]],
  reviewing: [["your", 0.6], ["the", 0.3], ["old", 0.07], ["movies", 0.01]],
  reading: [["the", 0.5], ["your", 0.3], ["aloud", 0.15], ["minds", 0.02]],
  asking: [["questions", 0.7], ["your", 0.2], ["for", 0.08], ["around", 0.02]],
  eight: [["hours", 0.9], ["times", 0.05], ["days", 0.03], ["minutes", 0.01]],
};

/** When nothing else matches, the sentence tends to wrap up. */
export const END_CANDIDATES: Candidate[] = [[".", 0.72], ["and", 0.14], ["!", 0.08], ["every", 0.04]];

/**
 * "High temperature" picks follow this fixed rank sequence so the lab is
 * repeatable: 0 = most likely word, 3 = least likely of the four shown.
 */
export const HIGH_TEMPERATURE_RANKS = [0, 2, 1, 3, 0, 1, 2, 0, 3, 1];

export const MAX_WORDS = 10;

export function candidatesFor(words: string[]): Candidate[] {
  const context = words.join(" ");
  const last = words[words.length - 1] ?? "";
  const list = BY_CONTEXT[context] ?? BY_LAST_WORD[last] ?? END_CANDIDATES;
  // Never offer the exact same word twice in a row.
  return list.filter(([word]) => word !== last);
}

export const isFinished = (words: string[]) => {
  const last = words[words.length - 1];
  return last === "." || last === "!" || words.length >= MAX_WORDS;
};
