import type { Metadata } from "next";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your XP, level, lesson progress, quiz performance, badges and learning streak — all in one place.",
};

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Student dashboard"
        title={
          <>
            Your progress, <span className="highlight">at a glance.</span>
          </>
        }
        description="Everything here updates the moment you finish a lesson, answer a check, explore a lab or complete a challenge."
      />
      <div className="container-page py-8 sm:py-10">
        <DashboardView />
      </div>
    </>
  );
}
