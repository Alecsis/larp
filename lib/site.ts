/** Site-wide constants used in metadata, the header and the footer. */
export const SITE = {
  name: "Tokenline",
  tagline: "The AI Learning Portal",
  description:
    "Tokenline is an interactive AI learning portal for high school students. Ride three learning lines — AI Fundamentals, AI Tools & Techniques, and Ethical & Responsible AI — earn XP and badges, and learn to use AI wisely.",
  // Replace with the deployed URL before submission (used for absolute Open Graph links).
  url: "https://tokenline.example.com",
  event: "TSA Webmaster 2026–2027",
} as const;

export const MAIN_NAV = [
  { href: "/learn", label: "Learn" },
  { href: "/challenges", label: "Challenges" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/achievements", label: "Achievements" },
  { href: "/resources", label: "Resources" },
] as const;

export const SECONDARY_NAV = [
  { href: "/about", label: "About" },
  { href: "/references", label: "References" },
] as const;
