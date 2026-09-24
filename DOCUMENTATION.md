# Tokenline — Technical Documentation

**Tokenline** is an interactive AI learning portal for high school students, built for the
**TSA Webmaster 2026–2027** theme, *Artificial Intelligence (AI) Learning Portal*.

This document explains how the site is built so any team member can present it in a
semifinalist interview.

---

## 1. What the site does

| Requirement | How Tokenline meets it |
| --- | --- |
| Fundamental AI concepts | **Line 1: AI Fundamentals**: 6 lessons (what AI is, machine learning, training data, neural networks, generative AI & LLMs, strengths & limits) |
| Practical AI tools & techniques | **Line 2: AI Tools & Techniques**: 6 lessons (how assistants work, prompt design, breaking down tasks, studying & brainstorming, research & coding, verifying output) |
| Ethical academic use | **Line 3: Ethical & Responsible AI**: 6 lessons (hallucinations, bias, privacy, academic integrity & citation, deepfakes/copyright, human oversight) |
| At least 3 learning modules | 3 modules, 18 lessons, 12 interactive labs, 6 hand-built diagrams |
| Gamification & progress tracking | XP, 8 levels, 12 badges, streaks, quizzes, a dashboard, and a route map that fills in as you learn |

**Design idea:** the whole portal is themed as a **transit map**. Each module is a colored
*line* (cobalt, tangerine, emerald), each lesson is a *station*, badges are *passport stamps*,
and all three lines meet at the **AI Scholar** terminal (the Final Challenge).

---

## 2. Technologies

| Technology | Why we used it |
| --- | --- |
| **Next.js 16 (App Router)** | File-based routing, static page generation, built-in metadata/SEO, font optimization and Open Graph image generation |
| **React 19** | Reusable components |
| **TypeScript** | Every lesson, quiz, badge and saved record has a defined type, so mistakes are caught before the site runs |
| **Tailwind CSS 4** | Utility classes built on **our own** design tokens (colors, fonts, sizes) defined in `app/globals.css` |
| **lucide-react** | Open-source (ISC) icon components |
| **localStorage** | Saves progress in the student's browser. No accounts, servers or databases |
| **ESLint** | Code quality checks |
| **tsx** (dev only) | Runs our content checker script |

No external AI API is used. Every lab is a small **deterministic simulation** we wrote, so the
site works offline and gives judges the same results every time.

---

## 3. Project structure

```
app/                         ← pages (each folder = a URL)
  layout.tsx                 ← shared shell: fonts, header, footer, skip link, reward pop-ups
  page.tsx                   ← /            Home
  learn/page.tsx             ← /learn       Learning hub + route map
  learn/[moduleId]/page.tsx  ← /learn/ai-fundamentals (etc.)    Module overview
  learn/[moduleId]/[lessonId]/page.tsx  ← /learn/ai-fundamentals/what-is-ai (etc.)  Lesson
  challenges/page.tsx        ← /challenges  All quizzes
  challenges/[quizId]/page.tsx ← /challenges/fundamentals-quiz (etc.)  Quiz runner
  dashboard/page.tsx         ← /dashboard
  achievements/page.tsx      ← /achievements
  resources/page.tsx         ← /resources   Links, glossary, AI checklist
  references/page.tsx        ← /references  Sources, media credits, technologies, framework declaration
  about/page.tsx             ← /about
  not-found.tsx              ← custom 404
  opengraph-image.tsx, icon.svg, sitemap.ts, robots.ts  ← SEO / sharing

components/
  ui/            Button, ProgressBar, ProgressRing, PageHeader (design-system primitives)
  layout/        SiteHeader (desktop + mobile nav), SiteFooter, Logo
  learning/      LessonBlocks (renders lesson content), KnowledgeCheck, LessonRouteRail,
                 LessonCompletePanel, RouteMap, ReadingProgress, Glossary, ProgressBits
  learning/demos/     12 interactive labs + DemoFrame (shared lab wrapper) + registry (index.tsx)
  learning/diagrams/  6 hand-built SVG diagrams + registry (index.tsx)
  quiz/          ChoiceQuestion (one question), QuizRunner (whole quiz), QuizStatus
  dashboard/     DashboardView + widgets + ProgressControls (reset / sample data)
  gamification/  XpChip, BadgeStamp, AchievementGrid, RewardToasts, BadgeStatusCard
  home/          MiniTokenizer

data/            ← ALL CONTENT lives here, separate from the UI
  modules.ts            the 3 modules
  lessons/*.ts          the 18 lessons (one file per module)
  quizzes/*.ts          the 5 quizzes
  achievements.ts       the 12 badges and their unlock rules
  demos.ts              the list of labs
  references.ts         citations, media credits, technologies, framework declaration
  resources.ts          external resources + AI checklist

lib/
  content.ts            lookup helpers (getModule, getLesson, getAdjacentLessons…)
  progress/             the progress system (see section 5)
  shuffle.ts            deterministic answer-order shuffle
  line-colors.ts, cn.ts, site.ts

types/
  content.ts            Module, Lesson, LessonBlock, Question, Quiz
  progress.ts           ProgressState and its records

scripts/check-content.ts ← validates the content (npm run check:content)
```

**Key principle: content is data.** A lesson is a plain object with a list of *blocks*
(`text`, `terms`, `callout`, `mythFact`, `example`, `steps`, `compare`, `diagram`, `demo`,
`check`…). `LessonBlocks.tsx` turns each block type into UI. To add or edit a lesson you only
edit `data/lessons/*.ts`, with no UI code involved.

---

## 4. Routing

Next.js App Router maps folders to URLs. Square-bracket folders are **dynamic routes**:
`app/learn/[moduleId]/[lessonId]/page.tsx` handles all 18 lessons with one file.

Each dynamic page exports:

- `generateStaticParams()`: lists every valid URL so Next.js **pre-builds all pages as static
  HTML** at build time. Pages load fast and need no server logic.
- `dynamicParams = false`: any URL not in that list shows the custom 404 page.
- `generateMetadata()`: a unique title and description for every lesson and quiz.

The production build generates **40 static pages**.

---

## 5. Progress system & localStorage

### What is saved

`types/progress.ts` defines `ProgressState`:

```ts
{
  version: 1,
  lessons:  { "ai-fundamentals/what-is-ai": { completedAt, xp } },
  checks:   { "kc-what-is-ai-1": { firstTryCorrect, attempts, answeredAt } },
  quizzes:  { "fundamentals-quiz": { bestScore, lastScore, total, attempts, lastTakenAt, xp } },
  demos:    { "tokenizer": "2026-09-24T…" },
  badges:   { "first-steps": { unlockedAt } },
  activeDays: ["2026-09-24", …],
  activity:   [ { type, label, xp, at, href }, … ]   // newest first, max 30
}
```

It is stored as JSON under the key `tokenline:progress:v1`.

### The four layers

| File | Job |
| --- | --- |
| `lib/progress/storage.ts` | The **only** code that touches `localStorage`. Wrapped in `try/catch` (private browsing or full storage won't crash the site). `sanitizeProgress()` validates saved data before trusting it. |
| `lib/progress/store.ts` | Keeps the current state in memory and notifies components when it changes. Exposes the `useProgress()` hook. Also syncs between open tabs using the `storage` event. |
| `lib/progress/actions.ts` | The **only** functions that change progress: `completeLesson`, `answerCheck`, `recordQuizResult`, `recordDemoTry`, `resetAllProgress`, `loadSampleProgress`. Each one records the event, logs activity, checks for new badges, saves, and shows reward pop-ups. |
| `lib/progress/selectors.ts` | Pure functions that **calculate** totals: XP, level, percentages, streaks, quiz averages, next lesson. |

### Preventing hydration bugs

Next.js renders pages on the server, where `localStorage` doesn't exist. If the server HTML
said "0 XP" and the browser immediately rendered "240 XP", React would report a
**hydration mismatch**.

We use React's built-in **`useSyncExternalStore`** with a `getServerSnapshot` that returns
an empty progress object. During hydration React uses the empty (server-matching) state, then
immediately re-renders with the real saved data. A small `useHydrated()` hook lets widgets
show a neutral placeholder ("—") instead of a misleading "0" for that split second. Browser
tests show **zero hydration warnings** on every page.

### Reset & demo data

The **Dashboard → Progress tools** panel has:

- **Reset progress**: clears everything (with a confirmation dialog).
- **Load sample progress**: fills in a realistic mid-journey student so judges can see
  every dashboard widget populated instantly.

---

## 6. XP, levels and badges

All rules are in `lib/progress/xp.ts`:

| Action | XP |
| --- | --- |
| Complete a lesson | 50 (set per lesson) |
| Knowledge check correct **on the first try** | 10 |
| Each correct answer on a quiz's **best** attempt | 10 |
| Perfect quiz score | +25 bonus |
| First time exploring a lab | 5 |
| Unlocking a badge | 20–100 (set per badge) |

**XP is never stored as a single number.** It is recalculated from the saved records every
time (`computeXp()` in `selectors.ts`). It can't be double-counted, and it can't drift out of
sync.

**Anti-farming rules** (these keep gamification meaningful):

- A lesson's **Complete** button unlocks only after every knowledge check has been answered.
- Only the **first** attempt of a knowledge check earns XP. Retries are allowed for learning.
- Quiz XP is based on the **best** score. Retakes can only raise it, never lower it or add it twice.

**Levels:** 8 levels from *Curious Newcomer* (0 XP) to *AI Scholar* (1,900 XP). The maximum
XP available is 2,450, so the top level is reachable (verified by `npm run check:content`).

**Badges** (`data/achievements.ts`): each badge has a `measure()` function returning
`{ current, target }`. The same function unlocks the badge **and** draws its progress bar on
the Achievements page, so the rule and the display always agree.

---

## 7. Quiz architecture

- `types/content.ts` defines `Question` (id, prompt, optional scenario, options,
  correctOptionId, explanation) and `Quiz` (id, kind, passPercent, questions).
- **`ChoiceQuestion`** renders one question. Knowledge checks inside lessons and full quizzes
  both use it, so every question looks and behaves the same.
- **`QuizRunner`** manages the flow: *intro → one question at a time → instant feedback with
  explanation → results with full answer review*. It then calls `recordQuizResult()`.
- Answer options are shown in a **deterministic shuffled order** (`lib/shuffle.ts`, seeded by
  question id). The correct answer isn't predictably in one position, and server and browser
  render the same order.
- 5 challenges: 3 line quizzes (8 questions each), a real-world **scenario** challenge
  (8 questions), and the **Final Challenge** (12 questions across all lines). Pass mark: 70%.
- 80 questions in total (36 knowledge checks + 44 quiz questions).

---

## 8. Interactive labs

| Lab | Lesson | Teaches |
| --- | --- | --- |
| Train a Classifier | Machine learning | Labeled examples shape predictions (k-nearest neighbors) |
| Data Diet | Training data | Data quality and coverage change accuracy |
| Build a Neuron | Neural networks | Weighted sum + threshold; learning = adjusting weights |
| Token Vision | Generative AI & LLMs | How text is split into tokens |
| Next-Word Predictor | Generative AI & LLMs | Generation = picking likely next tokens |
| Prompt Builder | Prompt design | Goal, Context, Format, Limits |
| Task Splitter | Breaking down tasks | Ordering steps; where AI helps vs. your job |
| Claim Checker | Verifying AI output | Checking claims one by one |
| Hallucination Hunt | Hallucinations | Confident ≠ correct |
| Biased Screener | Bias & fairness | Biased historical data and proxy variables |
| Share or Shield? | Privacy | What never belongs in a chatbot |
| Who Should Decide? | Human oversight | When humans must stay in charge |

Every lab uses the shared **`DemoFrame`** wrapper (title, instructions, "what to notice")
and the **`useDemoTracker()`** hook, which awards lab XP on the first real interaction. All
lab examples are clearly labeled as simulated or fictional.

---

## 9. Accessibility

- **Semantic HTML:** `header`, `nav`, `main`, `article`, `section`, `aside`, `figure`, `dl`,
  `table` with captions and scoped headers; one `h1` per page and a logical heading order.
- **Skip link** ("Skip to main content") as the first focusable element.
- **Keyboard:** everything works without a mouse. Quiz answers are real radio buttons in a
  `fieldset`/`legend` (arrow keys work). The mobile menu closes with Escape. Confirm dialogs
  use the native `<dialog>` element, which traps focus and handles Escape. Task Splitter uses
  Move up/Move down buttons instead of drag-and-drop.
- **Visible focus:** a 3px focus ring on every interactive element (yellow on dark sections).
- **Focus management:** moving to the next quiz question or the results moves focus to its
  heading for screen-reader users.
- **Screen readers:** reward pop-ups and answer feedback use `aria-live` regions. Progress bars
  use `role="progressbar"` with values. Decorative icons are `aria-hidden`. SVG diagrams have
  `<title>` and `<desc>`.
- **Not color alone:** correct/incorrect answers show icons **and** text ("Correct answer",
  "Your answer").
- **Contrast:** each line color has a darker `-ink` variant for text that meets WCAG AA.
- **Readable type:** body text uses **Atkinson Hyperlegible**, designed by the Braille
  Institute for low-vision readers.
- **Reduced motion:** all animation is disabled when the device requests reduced motion.
- **Automated audit:** axe-core (WCAG 2.1 A/AA + best practices) reports **0 violations** on all
  34 URLs at desktop and mobile widths, and in interactive states (answered checks, lab
  results, open menu, open dialog).

---

## 10. Responsive design

Layouts are designed for each size, not just shrunk:

- **Phone:** hamburger menu with large tap targets. The lesson's station list becomes a
  collapsible "Stations · 2/6 complete" panel. The route lines on the home page become a
  vertical list. Lab controls stack. Wide tables scroll inside their own focusable region.
- **Tablet:** two-column grids for cards and dashboard widgets.
- **Laptop/desktop:** sticky station rail beside lessons, three-column dashboard, and
  side-by-side hero with the route map.
- Tested at 390px, 768px, 1280px and 1440px with **no horizontal page scrolling**.
- Fluid heading sizes use CSS `clamp()` (tokens `text-display-xl/lg/md`).

---

## 11. Design system

Defined in `app/globals.css` (Tailwind v4 `@theme`) and used everywhere:

- **Color tokens:** `paper`, `ink`, and one color per line: `cobalt`, `tangerine`, `emerald`
  (each with `-ink` for text and `-soft` for tints), plus `sun` for rewards and highlights.
- **Type:** Bricolage Grotesque (display), Atkinson Hyperlegible Next (body), Atkinson
  Hyperlegible Mono (labels). Utilities: `text-display-*`, `eyebrow`, `highlight`.
- **Surfaces:** ink-bordered cards with a "hard" offset shadow (`shadow-pop`) for interactive
  items, plain bordered cards for content, full-bleed dark bands for emphasis, and a
  graph-paper texture for page headers.
- **Components:** `Button` (primary/secondary/ghost/sun), `ProgressBar`, `ProgressRing`,
  `PageHeader`, `SectionHeading`, `Widget`, `BadgeStamp`, `DemoFrame`, `ChoiceQuestion`.
- **Motion:** `animate-rise` (enter), `animate-pop` (badge unlock), `animate-shake` (wrong
  answer), `animate-draw` (route lines draw in). All short, all disabled for reduced motion.

---

## 12. TSA compliance: no pre-built templates

- The project started from the **empty** `create-next-app` starter. Its placeholder page and
  assets were deleted.
- **No** templates, themes, UI kits, dashboard templates, shadcn blocks or copied layouts
  were used.
- Libraries are used **only for technical primitives:** routing (Next.js), styling utilities
  (Tailwind), and icons (Lucide).
- Every layout, component, color palette, diagram, badge design and the transit-map theme was
  created for this project.
- The required framework declaration appears on `/references#framework-declaration`:

> This website was developed using Next.js, React, TypeScript, and Tailwind CSS. All page
> layouts, visual designs, components, and themes used in this website were created
> specifically by the team and were not derived from pre-built website templates or themes.

---

## 13. References & citations

- Edit sources in `data/references.ts`. Each has a `status`:
  - `checked`: link opened and title confirmed on the `accessed` date
  - `verify`: the team must open it and confirm before submission
  - `placeholder`: a claim needs a source. **Never** fill this with an invented citation.
- Lessons cite sources with `sourceIds: ["nist-ai-rmf", …]`. Each lesson shows its sources at
  the bottom, linked to the full MLA-style citation on the References page.

---

## 14. Running the project

```bash
npm install              # install dependencies
npm run dev              # development server → http://localhost:3000
npm run lint             # ESLint
npm run typecheck        # TypeScript
npm run check:content    # validate lessons, quizzes, sources, XP balance
npm run build            # production build (static pages)
npm run start            # serve the production build
```

Requires Node.js 20.9 or newer.

## 15. Browser support

The site uses only widely supported web features (CSS grid/flex, `<dialog>`,
`useSyncExternalStore`, `localStorage`, SVG). Next.js 16 targets Chrome/Edge 111+,
Firefox 111+ and Safari 16.4+. Enhancements such as `text-wrap: balance` degrade gracefully.
