import type { Metadata } from "next";
import { AchievementGrid, AchievementSummary, LevelLadder } from "@/components/gamification/AchievementGrid";
import { PageHeader, SectionHeading } from "@/components/ui/PageHeader";
import { XP_RULES } from "@/lib/progress/xp";

export const metadata: Metadata = {
  title: "Achievements",
  description: "Collect badge stamps and level up from Curious Newcomer to AI Scholar by completing lessons, labs and challenges.",
};

const EARN_XP = [
  { action: "Complete a lesson", xp: `${XP_RULES.lessonDefault} XP`, note: "Answer its knowledge checks first" },
  { action: "Knowledge check, first try", xp: `${XP_RULES.checkFirstTry} XP`, note: "Retries are free but earn no XP" },
  { action: "Correct challenge answer", xp: `${XP_RULES.quizCorrect} XP`, note: "Best attempt counts" },
  { action: "Perfect challenge score", xp: `+${XP_RULES.quizPerfectBonus} XP`, note: "Bonus on top" },
  { action: "Explore a new interactive lab", xp: `${XP_RULES.demoFirstTry} XP`, note: "First time per lab" },
  { action: "Unlock a badge", xp: "20–100 XP", note: "Shown on each badge" },
];

export default function AchievementsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Achievements"
        accent="bg-sun"
        title={
          <>
            Collect the stamps. <span className="highlight">Climb the levels.</span>
          </>
        }
        description="Badges reward real learning milestones — finishing lines, fact-checking, perfect scores and consistent practice. Progress bars show how close you are."
      >
        <AchievementSummary />
      </PageHeader>

      <div className="container-page space-y-14 py-10">
        <section aria-labelledby="badges-title">
          <SectionHeading id="badges-title" eyebrow="Badge stamps" title="Badges" />
          <div className="mt-5">
            <AchievementGrid />
          </div>
        </section>

        <section aria-labelledby="levels-title">
          <SectionHeading id="levels-title" eyebrow="Levels" title="From Curious Newcomer to AI Scholar" intro="Your level is based on total XP. Every lesson, check, lab and challenge moves you forward." />
          <div className="mt-5">
            <LevelLadder />
          </div>
        </section>

        <section aria-labelledby="xp-title">
          <SectionHeading id="xp-title" eyebrow="The rules" title="How to earn XP" intro="XP is always recalculated from what you've actually done, so it can't be double-counted or lost." />
          <div role="region" aria-label="Ways to earn XP (scrollable table)" tabIndex={0} className="mt-5 overflow-x-auto rounded-2xl border-2 border-ink bg-surface">
            <table className="w-full min-w-[32rem] text-left">
              <caption className="sr-only">Ways to earn XP</caption>
              <thead className="bg-paper-2">
                <tr>
                  <th scope="col" className="px-4 py-3 font-display">
                    Action
                  </th>
                  <th scope="col" className="px-4 py-3 font-display">
                    Reward
                  </th>
                  <th scope="col" className="px-4 py-3 font-display">
                    Note
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {EARN_XP.map((row) => (
                  <tr key={row.action}>
                    <th scope="row" className="px-4 py-3 font-bold">
                      {row.action}
                    </th>
                    <td className="px-4 py-3 font-mono font-bold">{row.xp}</td>
                    <td className="px-4 py-3 text-ink-2">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
