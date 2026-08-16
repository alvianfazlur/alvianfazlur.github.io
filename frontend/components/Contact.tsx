"use client";
import { EnvelopeSimple, LinkedinLogo, MapPin } from "@phosphor-icons/react";
import Reveal from "./Reveal";
import { profile } from "@/lib/profile";

export default function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-border bg-surface/50"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 text-center md:py-32">
        <Reveal>
          <p className="font-mono text-sm text-accent">{"// "}Open to Work</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Got a product that needs{" "}
            <em className="font-medium not-italic text-accent">quality</em>?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted">
            I help teams ship with confidence. Let&apos;s talk about your
            testing strategy, automation, or performance goals.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-emerald-950 shadow-sm transition-transform active:scale-[0.98]"
            >
              <EnvelopeSimple size={18} weight="bold" />
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <LinkedinLogo size={18} weight="fill" />
              LinkedIn
            </a>
          </div>
          <p className="mt-6 inline-flex items-center gap-1.5 font-mono text-sm text-muted">
            <MapPin size={15} weight="duotone" />
            {profile.location}
          </p>
        </Reveal>
      </div>
    </section>
  );
}