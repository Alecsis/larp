import {
  Compass,
  Cpu,
  Flag,
  FlaskConical,
  Flame,
  Footprints,
  GraduationCap,
  Layers,
  Lock,
  Scale,
  SearchCheck,
  Target,
  WandSparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { Achievement, AchievementIcon } from "@/data/achievements";
import { cn } from "@/lib/cn";

const ICONS: Record<AchievementIcon, LucideIcon> = {
  footprints: Footprints,
  flag: Flag,
  compass: Compass,
  flask: FlaskConical,
  cpu: Cpu,
  wand: WandSparkles,
  scale: Scale,
  "search-check": SearchCheck,
  target: Target,
  zap: Zap,
  layers: Layers,
  flame: Flame,
  graduation: GraduationCap,
};

const TONES: Record<Achievement["tone"], { ring: string; fill: string; icon: string }> = {
  cobalt: { ring: "border-cobalt", fill: "bg-cobalt-soft", icon: "text-cobalt-ink" },
  tangerine: { ring: "border-tangerine", fill: "bg-tangerine-soft", icon: "text-tangerine-ink" },
  emerald: { ring: "border-emerald", fill: "bg-emerald-soft", icon: "text-emerald-ink" },
  sun: { ring: "border-ink", fill: "bg-sun", icon: "text-ink" },
  ink: { ring: "border-ink", fill: "bg-ink", icon: "text-sun" },
};

/**
 * A badge drawn as a passport-style "stamp": a circle with a dashed inner
 * ring. Locked badges appear as a grey outline with a lock.
 */
export function BadgeStamp({
  badge,
  unlocked,
  size = "md",
  animate = false,
}: {
  badge: Achievement;
  unlocked: boolean;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}) {
  const Icon = unlocked ? ICONS[badge.icon] : Lock;
  const tone = TONES[badge.tone];
  const dims = size === "sm" ? "size-12" : size === "lg" ? "size-24" : "size-16";
  const iconSize = size === "sm" ? "size-5" : size === "lg" ? "size-10" : "size-7";

  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative grid shrink-0 place-items-center rounded-full border-[3px]",
        dims,
        unlocked ? cn(tone.ring, tone.fill, "-rotate-6") : "border-rule bg-paper-2",
        unlocked && animate && "animate-pop",
      )}
    >
      <span
        className={cn(
          "absolute inset-1 rounded-full border-2 border-dashed",
          unlocked ? (badge.tone === "ink" ? "border-sun/60" : "border-ink/30") : "border-rule",
        )}
      />
      <Icon className={cn(iconSize, unlocked ? tone.icon : "text-ink-3")} />
    </span>
  );
}
