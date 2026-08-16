"use client";
import { LinkBreak } from "@phosphor-icons/react";
import { profile } from "@/lib/profile";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <div className="flex items-center gap-2">
          <LinkBreak size={18} weight="bold" className="text-accent" />
          <span className="text-sm font-semibold tracking-tight">
            {profile.name}
          </span>
        </div>
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} · Quality Assurance
        </p>
      </div>
    </footer>
  );
}