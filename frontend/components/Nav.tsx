"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { LinkBreak, LockKey } from "@phosphor-icons/react";
import { profile } from "@/lib/profile";

const links = [
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/blogs", label: "Blog" },
];

export default function Nav() {
  const reduce = useReducedMotion();
  return (
    <motion.header
      initial={reduce ? false : { y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur"
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <LinkBreak size={20} weight="bold" className="text-accent" />
          <span className="text-sm font-semibold tracking-tight">
            {profile.initials}
          </span>
        </Link>
        <ul className="hidden items-center gap-8 sm:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="hidden rounded-full bg-accent px-4 py-2 text-sm font-semibold text-emerald-950 shadow-sm active:scale-[0.98] sm:inline-flex"
          >
            Hire Me
          </a>
          <Link
            href="/admin/blogs"
            title="Admin login"
            aria-label="Admin login"
            className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-ink"
          >
            <LockKey size={15} weight="duotone" />
            <span className="hidden md:inline">Login</span>
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}