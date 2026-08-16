"use client";
import { Code, Gauge, MagnifyingGlass } from "@phosphor-icons/react";
import Reveal from "./Reveal";
import { profile } from "@/lib/profile";

const icon = { automation: Code, performance: Gauge, manual: MagnifyingGlass };

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <Reveal>
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            What I Do
          </h2>
          <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-muted">
            Three ways I help ship reliable software — covering the whole
            quality lifecycle, not just one tool.
          </p>
        </div>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
        {profile.areas.map((area, i) => {
          const Icon = icon[area.key as keyof typeof icon];
          return (
            <Reveal key={area.key} delay={i * 0.08}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent">
                <span className="flex size-11 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <Icon size={22} weight="duotone" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{area.label}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {area.blurb}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {area.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border px-3 py-1 font-mono text-xs text-ink"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-6">
        <div className="rounded-2xl border border-border bg-surface px-6 py-5">
          <span className="font-mono text-xs tracking-wide text-muted">
            {"$ "}Toolbelt
          </span>
          <ul className="mt-4 flex flex-wrap gap-2">
            {profile.tools.map((t) => (
              <li
                key={t}
                className="font-mono text-sm text-ink transition-colors hover:text-accent"
              >
                {t}
                <span className="mx-2 text-border last:hidden">·</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}