import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="graph-paper border-b-2 border-ink">
      <div className="container-page flex flex-col items-start py-20">
        <p className="eyebrow text-ink-3">Error 404 · Station not found</p>
        <h1 className="mt-2 text-display-lg font-extrabold">
          This stop isn&apos;t on <span className="highlight">any line.</span>
        </h1>
        <p className="mt-3 max-w-xl text-lg text-ink-2">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Head back to the route map to find your next lesson.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="/learn">
            Go to the route map <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
          <ButtonLink href="/" variant="secondary">
            Home
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
