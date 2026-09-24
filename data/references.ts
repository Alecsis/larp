/**
 * REFERENCES — edit this file to update the References page.
 *
 * status:
 *   "checked"      → the link was opened and the page title matched on `accessed`.
 *   "verify"       → looks right but the team must open it and confirm before submission.
 *   "placeholder"  → a claim needs a source we don't have yet. Never fill these
 *                    with a made-up citation — find a real source or rewrite the claim.
 *
 * To cite a source in a lesson, add its `id` to that lesson's `sourceIds`.
 */

export type SourceStatus = "checked" | "verify" | "placeholder";

export interface Source {
  id: string;
  /** Author(s) or organization. */
  creator: string;
  title: string;
  /** Publisher / website / journal. */
  container?: string;
  year?: string;
  url?: string;
  kind: "Report" | "Course" | "Paper" | "Style guide" | "Article" | "Video series" | "Website";
  /** What we used it for on the site. */
  usedFor: string;
  status: SourceStatus;
  /** Date the link was last checked (YYYY-MM-DD). */
  accessed?: string;
}

export const CONTENT_SOURCES: Source[] = [
  {
    id: "elements-of-ai",
    creator: "University of Helsinki and MinnaLearn",
    title: "Elements of AI",
    container: "Free online course",
    url: "https://www.elementsofai.com/",
    kind: "Course",
    usedFor: "Plain-language definitions of AI and machine learning; limits of AI (Line 1, Line 2).",
    status: "checked",
    accessed: "2026-09-24",
  },
  {
    id: "ai4k12-big-ideas",
    creator: "AI4K12 Initiative (AAAI and CSTA)",
    title: "Five Big Ideas in Artificial Intelligence",
    container: "AI4K12.org",
    url: "https://ai4k12.org/",
    kind: "Website",
    usedFor: "Framing AI concepts at a K–12 level: perception, representation, learning, interaction, societal impact.",
    status: "checked",
    accessed: "2026-09-24",
  },
  {
    id: "google-ml-crash-course",
    creator: "Google for Developers",
    title: "Machine Learning Crash Course",
    container: "developers.google.com",
    url: "https://developers.google.com/machine-learning/crash-course",
    kind: "Course",
    usedFor: "Supervised learning, labels, features, training vs. inference (Line 1).",
    status: "checked",
    accessed: "2026-09-24",
  },
  {
    id: "3b1b-neural-networks",
    creator: "Grant Sanderson (3Blue1Brown)",
    title: "Neural Networks",
    container: "3Blue1Brown video series",
    url: "https://www.3blue1brown.com/topics/neural-networks",
    kind: "Video series",
    usedFor: "Conceptual explanation of neurons, weights, layers and learning (Line 1).",
    status: "checked",
    accessed: "2026-09-24",
  },
  {
    id: "attention-is-all-you-need",
    creator: "Ashish Vaswani et al.",
    title: "Attention Is All You Need",
    container: "Advances in Neural Information Processing Systems 30 (NeurIPS 2017); arXiv:1706.03762",
    year: "2017",
    url: "https://arxiv.org/abs/1706.03762",
    kind: "Paper",
    usedFor: "The transformer architecture behind today's large language models (Line 1).",
    status: "checked",
    accessed: "2026-09-24",
  },
  {
    id: "nist-ai-rmf",
    creator: "National Institute of Standards and Technology (NIST)",
    title: "Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1",
    container: "U.S. Department of Commerce",
    year: "2023",
    url: "https://doi.org/10.6028/NIST.AI.100-1",
    kind: "Report",
    usedFor: "Trustworthy AI characteristics, managing AI risk, and the role of human oversight (Lines 1–3).",
    status: "checked",
    accessed: "2026-09-24",
  },
  {
    id: "unesco-genai-guidance",
    creator: "UNESCO (Fengchun Miao and Wayne Holmes)",
    title: "Guidance for Generative AI in Education and Research",
    container: "UNESCO",
    year: "2023",
    url: "https://unesdoc.unesco.org/ark:/48223/pf0000386693",
    kind: "Report",
    usedFor: "Responsible, human-centered use of generative AI by students (Lines 2–3).",
    // The UNESCO site blocked our automated link check — open it in a browser to confirm.
    status: "verify",
  },
  {
    id: "sift-caulfield",
    creator: "Mike Caulfield",
    title: "SIFT (The Four Moves)",
    container: "Hapgood (blog)",
    year: "2019",
    url: "https://hapgood.us/2019/06/19/sift-the-four-moves/",
    kind: "Article",
    usedFor: "The SIFT verification moves: Stop, Investigate the source, Find better coverage, Trace claims (Lines 2–3).",
    status: "checked",
    accessed: "2026-09-24",
  },
  {
    id: "gender-shades",
    creator: "Joy Buolamwini and Timnit Gebru",
    title: "Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification",
    container: "Proceedings of the 1st Conference on Fairness, Accountability and Transparency, PMLR 81, pp. 77–91",
    year: "2018",
    url: "https://proceedings.mlr.press/v81/buolamwini18a.html",
    kind: "Paper",
    usedFor: "Evidence that facial analysis systems performed unequally across skin type and gender (Line 3: Bias).",
    status: "checked",
    accessed: "2026-09-24",
  }
];

export const PROJECT_SOURCES: Source[] = [
  {
    id: "tsa-webmaster",
    creator: "Technology Student Association",
    title: "High School Competitive Events Guide — Webmaster (2026–2027 theme: AI Learning Portal)",
    container: "tsaweb.org",
    url: "https://tsaweb.org/",
    kind: "Website",
    usedFor: "Competition requirements this portal was built to meet.",
    status: "verify",
  },
  {
    id: "wcag",
    creator: "W3C Web Accessibility Initiative",
    title: "Web Content Accessibility Guidelines (WCAG) Overview",
    container: "w3.org",
    url: "https://www.w3.org/WAI/standards-guidelines/wcag/",
    kind: "Website",
    usedFor: "Accessibility targets: contrast, keyboard access, focus visibility, reduced motion.",
    status: "checked",
    accessed: "2026-09-24",
  },
];

export interface MediaCredit {
  name: string;
  creator: string;
  license: string;
  url?: string;
  usedFor: string;
}

/** Images, icons, fonts and other media. */
export const MEDIA_CREDITS: MediaCredit[] = [
  {
    name: "Diagrams, route maps, badge stamps, logo and illustrations",
    creator: "Created by our team in SVG, HTML and CSS",
    license: "Original work",
    usedFor: "Every diagram and illustration on the site. No stock photos or AI-generated images are used.",
  },
  {
    name: "Lucide icons (lucide-react)",
    creator: "Lucide contributors",
    license: "ISC License",
    url: "https://lucide.dev/license",
    usedFor: "Interface icons (arrows, checkmarks, badge symbols).",
  },
  {
    name: "Bricolage Grotesque",
    creator: "Mathieu Triay (via Google Fonts)",
    license: "SIL Open Font License 1.1",
    url: "https://fonts.google.com/specimen/Bricolage+Grotesque",
    usedFor: "Display headings.",
  },
  {
    name: "Atkinson Hyperlegible Next & Atkinson Hyperlegible Mono",
    creator: "Braille Institute of America (via Google Fonts)",
    license: "SIL Open Font License 1.1",
    url: "https://www.brailleinstitute.org/freefont/",
    usedFor: "Body text and labels — chosen for legibility for low-vision readers.",
  },
];

export interface Technology {
  name: string;
  version: string;
  role: string;
  license: string;
  url: string;
}

/** Keep versions in sync with package.json. */
export const TECHNOLOGIES: Technology[] = [
  { name: "Next.js", version: "16.3", role: "React framework: App Router, file-based routing, static page generation, metadata, font optimization", license: "MIT", url: "https://nextjs.org/" },
  { name: "React", version: "19.2", role: "Component-based user interface library", license: "MIT", url: "https://react.dev/" },
  { name: "TypeScript", version: "5", role: "Typed JavaScript — every lesson, quiz and progress record has a defined type", license: "Apache-2.0", url: "https://www.typescriptlang.org/" },
  { name: "Tailwind CSS", version: "4", role: "Utility-first CSS used to implement our own design tokens and components", license: "MIT", url: "https://tailwindcss.com/" },
  { name: "lucide-react", version: "1.x", role: "Open-source icon components", license: "ISC", url: "https://lucide.dev/" },
  { name: "ESLint", version: "9", role: "Code quality checks (with Next.js rules)", license: "MIT", url: "https://eslint.org/" },
  { name: "Browser localStorage (Web Storage API)", version: "—", role: "Saves progress on the student's own device; no accounts or servers", license: "Web standard", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" },
];

export const FRAMEWORK_DECLARATION =
  "This website was developed using Next.js, React, TypeScript, and Tailwind CSS. All page layouts, visual designs, components, and themes used in this website were created specifically by the team and were not derived from pre-built website templates or themes.";

const ALL_SOURCES = [...CONTENT_SOURCES, ...PROJECT_SOURCES];

export function getSource(id: string): Source | undefined {
  return ALL_SOURCES.find((source) => source.id === id);
}
