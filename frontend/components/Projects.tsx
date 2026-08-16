"use client";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  FolderSimplePlus,
} from "@phosphor-icons/react";
import Reveal from "./Reveal";
import { profile, type Project } from "@/lib/profile";

const PER_PAGE = 6;

const labelText: Record<Project["label"], string> = {
  manual: "Manual",
  automation: "Automation",
  both: "Manual + Automation",
  performance: "Performance",
  development: "Development",
};

type Filter = "all" | Project["category"];

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "qa", label: "QA" },
  { key: "software-engineer", label: "Software Engineer" },
];

export default function Projects() {
  const { projects } = profile;
  const has = projects.length > 0;
  const [filter, setFilter] = useState<Filter>("all");
  const [page, setPage] = useState(1);

  const visible =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  const pageCount = Math.max(1, Math.ceil(visible.length / PER_PAGE));
  const currentPage = Math.min(page, pageCount);
  const paginated = visible.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  const changeFilter = (key: Filter) => {
    setFilter(key);
    setPage(1);
  };

  return (
    <section id="projects" className="border-t border-border bg-surface/50">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Selected Work
            </h2>
            <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-muted">
              {has
                ? "Projects where I owned quality end-to-end — from test strategy to shipped suites."
                : "My project case studies live here. Fill them in lib/profile.ts."}
            </p>
          </div>
        </Reveal>

        {has && (
          <Reveal>
            <div className="mt-10 flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => changeFilter(f.key)}
                  className={`rounded-full px-4 py-1.5 font-mono text-xs transition-colors ${
                    filter === f.key
                      ? "bg-accent text-emerald-950"
                      : "border border-border text-muted hover:border-accent hover:text-ink"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>
        )}

        {has ? (
          <>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {paginated.map((p, i) => (
                <Reveal key={p.title} delay={(i % 2) * 0.08}>
                  <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent">
                    <div className="flex items-center justify-between gap-4">
                      <span
                        className={`rounded-full px-3 py-1 font-mono text-xs ${
                          p.label === "both" || p.label === "performance"
                            ? "bg-accent-soft text-accent"
                            : "border border-border text-muted"
                        }`}
                      >
                        {labelText[p.label]}
                      </span>
                      <span className="font-mono text-xs text-muted">
                        {p.workplace}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                    {p.status && (
                      <p className="mt-1 inline-flex items-center gap-1.5 font-mono text-xs text-accent">
                        <span className="inline-block size-1.5 animate-pulse rounded-full bg-accent" />
                        {p.status}
                      </p>
                    )}
                    <div className="mt-auto flex flex-wrap gap-2 pt-5">
                      {p.stack.map((s) => (
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
              ))}
            </div>

            {pageCount > 1 && (
              <Reveal>
                <div className="mt-10 flex items-center justify-center gap-4">
                  <button
                    onClick={() => setPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ArrowLeft size={14} /> Prev
                  </button>
                  <span className="font-mono text-xs text-muted">
                    {currentPage} / {pageCount}
                  </span>
                  <button
                    onClick={() => setPage(currentPage + 1)}
                    disabled={currentPage === pageCount}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next <ArrowRight size={14} />
                  </button>
                </div>
              </Reveal>
            )}
          </>
        ) : (
          <Reveal className="mt-14">
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border px-6 py-20 text-center">
              <FolderSimplePlus size={36} weight="thin" className="text-muted" />
              <div>
                <p className="font-medium">No projects yet</p>
                <p className="mt-1 max-w-sm text-sm text-muted">
                  Add your QA projects to{" "}
                  <code className="font-mono text-accent">lib/profile.ts</code>{" "}
                  — title, category (qa / software-engineer), workplace, label
                  (manual / automation / both), and tech stack.
                </p>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

