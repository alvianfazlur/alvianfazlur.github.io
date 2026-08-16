"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDownRight, CheckCircle, LinkedinLogo, XCircle } from "@phosphor-icons/react";
import { profile } from "@/lib/profile";

const runRows = [
  { name: "checkout_flow.spec.ts", status: "pass", time: "1.2s" },
  { name: "payment_api · load test", status: "pass", time: "p95 < 500ms" },
  { name: "regression · full suite", status: "pass", time: "9m" },
  { name: "exploratory · auth", status: "note", time: "3 findings" },
];

export default function Hero() {
  const reduce = useReducedMotion();
  return (
    <section
      id="top"
      className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-6xl grid-cols-1 items-center gap-14 px-6 pb-20 pt-16 md:grid-cols-2 md:pt-24"
    >
      <div>
        <p className="mb-5 font-mono text-sm text-accent">
          {"// "}Quality Assurance Engineer
        </p>
        <h1 className="text-4xl font-semibold leading-[1.05] tracking-tighter md:text-6xl">
          I break software{" "}
          <em className="font-medium not-italic text-accent">on purpose</em>
          <br />
          so it doesn&apos;t break in production.
        </h1>
        <p className="mt-6 max-w-[55ch] text-base leading-relaxed text-muted">
          {profile.summary}
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-emerald-950 shadow-sm transition-transform active:scale-[0.98]"
          >
            See My Work
            <ArrowDownRight
              size={16}
              weight="bold"
              className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
            />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <LinkedinLogo size={16} weight="fill" />
            Get In Touch
          </a>
        </div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl border border-border bg-surface p-1 shadow-lg"
      >
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="size-2.5 rounded-full bg-red-400/70" />
          <span className="size-2.5 rounded-full bg-amber-400/70" />
          <span className="size-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 font-mono text-xs text-muted">
            ~/test-suite · run #142
          </span>
        </div>
        <div className="space-y-1 p-4 font-mono text-[13px]">
          {runRows.map((r, i) => (
            <motion.div
              key={r.name}
              initial={reduce ? false : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
              className="flex items-center justify-between gap-4 rounded-lg px-3 py-2.5"
            >
              <span className="flex items-center gap-2.5 truncate">
                {r.status === "pass" ? (
                  <CheckCircle size={16} weight="fill" className="shrink-0 text-accent" />
                ) : (
                  <XCircle size={16} weight="fill" className="shrink-0 text-amber-500" />
                )}
                <span className="truncate text-ink">{r.name}</span>
              </span>
              <span className="shrink-0 text-muted">{r.time}</span>
            </motion.div>
          ))}
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1 }}
            className="flex items-center gap-2 border-t border-border px-3 pt-3 text-xs"
          >
            <span className="inline-block size-2 animate-pulse rounded-full bg-accent" />
            <span className="text-muted">sample run · illustrative data</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}