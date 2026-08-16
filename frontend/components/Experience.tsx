"use client";
import Reveal from "./Reveal";
import { profile } from "@/lib/profile";

export default function Experience() {
  const { experience } = profile;

  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <Reveal>
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Experience
        </h2>
      </Reveal>

      {experience.length > 0 ? (
        <div className="mt-12 space-y-10">
          {experience.map((e, i) => (
            <Reveal key={e.role} delay={i * 0.06}>
              <article className="grid grid-cols-1 gap-2 border-t border-border pt-6 md:grid-cols-[220px_1fr] md:gap-10">
                <div className="md:text-left">
                  <span className="font-mono text-xs text-muted">
                    {e.period}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {e.role} · <span className="text-muted">{e.company}</span>
                  </h3>
                  <ul className="mt-3 max-w-2xl list-none space-y-2">
                    {e.points.map((pt, j) => (
                      <li
                        key={j}
                        className="flex gap-3 text-sm leading-relaxed text-muted"
                      >
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal className="mt-12">
          <p className="max-w-md text-sm leading-relaxed text-muted">
            Your work history goes here. Add entries to{" "}
            <code className="font-mono text-accent">lib/profile.ts</code>{" "}
            — role, company, period, and key achievements.
          </p>
        </Reveal>
      )}
    </section>
  );
}
