import { AlertTriangle, Bot, Check, ChevronDown, Lightbulb, MessageCircleQuestion, User, X } from "lucide-react";
import type { ReactNode } from "react";
import { DEMO_COMPONENTS } from "@/components/learning/demos";
import { DIAGRAM_COMPONENTS } from "@/components/learning/diagrams";
import { cn } from "@/lib/cn";
import { LINE_STYLES } from "@/lib/line-colors";
import type { CalloutTone, Lesson, LessonBlock, LineColor } from "@/types/content";
import { KnowledgeCheck } from "./KnowledgeCheck";

/**
 * Renders a lesson's list of blocks. Each block `type` maps to one small
 * presentational component below — adding a new block type means adding
 * one case to the switch.
 */
export function LessonBlocks({ lesson, color }: { lesson: Lesson; color: LineColor }) {
  // Number the knowledge checks 1, 2, … in the order they appear.
  const checkNumbers = lesson.blocks.map((_, i) => lesson.blocks.slice(0, i + 1).filter((b) => b.type === "check").length);
  return (
    <div>
      {lesson.blocks.map((block, index) => (
        <BlockView
          key={index}
          block={block}
          color={color}
          lesson={{ id: lesson.id, moduleId: lesson.moduleId, title: lesson.title }}
          checkNumber={checkNumbers[index]}
        />
      ))}
    </div>
  );
}

function BlockView({
  block,
  color,
  lesson,
  checkNumber,
}: {
  block: LessonBlock;
  color: LineColor;
  lesson: Pick<Lesson, "id" | "moduleId" | "title">;
  checkNumber: number;
}) {
  const line = LINE_STYLES[color];

  switch (block.type) {
    case "text":
      return (
        <section className="my-7">
          {block.heading && <BlockHeading>{block.heading}</BlockHeading>}
          {block.paragraphs.map((text, i) => (
            <p key={i} className="mt-3 text-[1.05rem] leading-relaxed text-ink-2 first:mt-0">
              {text}
            </p>
          ))}
        </section>
      );

    case "keyPoints":
      return (
        <section className={cn("my-8 rounded-2xl border-l-[6px] bg-surface p-5 shadow-soft", line.border)}>
          <BlockHeading>{block.heading}</BlockHeading>
          <ul className="mt-3 space-y-2.5">
            {block.points.map((point, i) => (
              <li key={i} className="flex gap-3">
                <span aria-hidden className={cn("mt-2 size-2.5 shrink-0 rounded-full ring-4", line.bg, "ring-paper-2")} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
      );

    case "terms":
      return (
        <section className="my-8">
          <BlockHeading>Key terms</BlockHeading>
          <dl className="mt-3 grid gap-3 sm:grid-cols-2">
            {block.terms.map((item) => (
              <div key={item.term} className="rounded-xl border border-rule bg-surface p-4">
                <dt className={cn("font-mono text-sm font-bold", line.text)}>{item.term}</dt>
                <dd className="mt-1 text-[0.95rem] text-ink-2">{item.definition}</dd>
              </div>
            ))}
          </dl>
        </section>
      );

    case "callout":
      return <Callout tone={block.tone} title={block.title} body={block.body} />;

    case "mythFact":
      return (
        <section className="my-8">
          <BlockHeading>Myth vs. fact</BlockHeading>
          <ul className="mt-3 space-y-3">
            {block.items.map((item, i) => (
              <li key={i} className="grid overflow-hidden rounded-xl border-2 border-ink md:grid-cols-2">
                <div className="flex gap-3 bg-danger-soft p-4">
                  <X aria-hidden className="mt-0.5 size-5 shrink-0 text-danger" />
                  <p>
                    <span className="eyebrow block text-danger">Myth</span>
                    {item.myth}
                  </p>
                </div>
                <div className="flex gap-3 border-t-2 border-ink bg-emerald-soft p-4 md:border-t-0 md:border-l-2">
                  <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-emerald-ink" />
                  <p>
                    <span className="eyebrow block text-emerald-ink">Fact</span>
                    {item.fact}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      );

    case "learnMore":
      return (
        <details className="group my-6 rounded-xl border-2 border-dashed border-ink/40 bg-surface open:border-solid open:border-ink">
          <summary className="flex items-center justify-between gap-3 rounded-xl px-4 py-3 font-display font-bold">
            <span>
              <span className="eyebrow mr-2 text-ink-3">Learn more</span>
              {block.title}
            </span>
            <ChevronDown aria-hidden className="size-5 shrink-0 transition-transform group-open:rotate-180" />
          </summary>
          <div className="space-y-3 px-4 pb-4 text-ink-2">
            {block.paragraphs.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        </details>
      );

    case "example":
      return (
        <figure className="my-8 overflow-hidden rounded-2xl border-2 border-ink bg-surface">
          <figcaption className="border-b-2 border-ink bg-paper-2 px-4 py-2.5 font-display font-bold">
            <span className="eyebrow mr-2 text-ink-3">Example</span>
            {block.title}
          </figcaption>
          <div className="space-y-3 p-4">
            <ChatBubble who="You" icon={<User aria-hidden className="size-4" />}>
              {block.prompt}
            </ChatBubble>
            <ChatBubble who="AI assistant (sample)" icon={<Bot aria-hidden className="size-4" />} ai>
              {block.response}
            </ChatBubble>
          </div>
          <p className="border-t border-rule bg-sun-soft px-4 py-3 text-[0.95rem]">
            <strong>Why it matters: </strong>
            {block.note}
          </p>
        </figure>
      );

    case "compare":
      return (
        <section className="my-8">
          <BlockHeading>{block.heading}</BlockHeading>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {[block.left, block.right].map((side, i) => (
              <div key={side.title} className={cn("rounded-xl border-2 p-4", i === 0 ? "border-rule bg-surface" : cn(line.border, line.soft))}>
                <h3 className="font-display text-lg font-bold">{side.title}</h3>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[0.95rem] text-ink-2 marker:text-ink-3">
                  {side.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      );

    case "steps":
      return (
        <section className="my-8">
          <BlockHeading>{block.heading}</BlockHeading>
          {/* Steps drawn as stations on a line, echoing the route-map theme */}
          <div className="relative mt-4">
          <span aria-hidden className={cn("absolute top-2 bottom-2 left-[13px] w-1 rounded-full", line.bg)} />
          <ol className="relative space-y-5 pl-10">
            {block.steps.map((step, i) => (
              <li key={step.title} className="relative">
                <span
                  aria-hidden
                  className={cn("absolute top-0 -left-10 grid size-7 place-items-center rounded-full border-[3px] bg-surface font-mono text-xs font-bold", line.border)}
                >
                  {i + 1}
                </span>
                <h3 className="font-display text-lg font-bold">{step.title}</h3>
                <p className="mt-1 text-ink-2">{step.body}</p>
              </li>
            ))}
          </ol>
          </div>
        </section>
      );

    case "diagram": {
      const Diagram = DIAGRAM_COMPONENTS[block.diagram];
      return (
        <figure className="my-8 rounded-2xl border-2 border-ink bg-surface p-3 sm:p-5">
          <Diagram />
          <figcaption className="mt-3 border-t border-rule pt-3 text-[0.95rem] text-ink-2">
            <span className="eyebrow mr-2 text-ink-3">Diagram</span>
            {block.caption}
          </figcaption>
        </figure>
      );
    }

    case "demo": {
      const Demo = DEMO_COMPONENTS[block.demo];
      return <Demo />;
    }

    case "check":
      return <KnowledgeCheck question={block.question} lesson={lesson} number={checkNumber} />;
  }
}

function BlockHeading({ children }: { children: ReactNode }) {
  return <h2 className="font-display text-2xl font-bold">{children}</h2>;
}

const CALLOUT_STYLES: Record<CalloutTone, { label: string; box: string; icon: ReactNode }> = {
  tip: { label: "Tip", box: "border-emerald bg-emerald-soft", icon: <Lightbulb aria-hidden className="size-5 text-emerald-ink" /> },
  warning: { label: "Watch out", box: "border-tangerine bg-tangerine-soft", icon: <AlertTriangle aria-hidden className="size-5 text-tangerine-ink" /> },
  think: { label: "Think about it", box: "border-cobalt bg-cobalt-soft", icon: <MessageCircleQuestion aria-hidden className="size-5 text-cobalt-ink" /> },
};

function Callout({ tone, title, body }: { tone: CalloutTone; title: string; body: string }) {
  const style = CALLOUT_STYLES[tone];
  return (
    <aside className={cn("my-8 flex gap-3 rounded-xl border-l-[6px] p-4 sm:p-5", style.box)}>
      <span className="mt-0.5 shrink-0">{style.icon}</span>
      <div>
        <p className="eyebrow text-ink-2">{style.label}</p>
        <p className="font-display text-lg font-bold">{title}</p>
        <p className="mt-1 text-ink-2">{body}</p>
      </div>
    </aside>
  );
}

function ChatBubble({ who, icon, ai, children }: { who: string; icon: ReactNode; ai?: boolean; children: ReactNode }) {
  return (
    <div className={cn("flex gap-2.5", ai ? "" : "flex-row-reverse text-right")}>
      <span className={cn("grid size-8 shrink-0 place-items-center rounded-full border-2 border-ink", ai ? "bg-sun" : "bg-paper-2")}>{icon}</span>
      <div className={cn("max-w-[85%] rounded-xl px-3.5 py-2.5 text-left", ai ? "bg-paper" : "bg-ink text-paper")}>
        <p className={cn("eyebrow mb-1", ai ? "text-ink-3" : "text-paper/70")}>{who}</p>
        <p className="text-[0.95rem] whitespace-pre-line">{children}</p>
      </div>
    </div>
  );
}
