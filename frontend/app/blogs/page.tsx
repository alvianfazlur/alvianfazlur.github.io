"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Article, ArrowLeft, ArrowRight, House } from "@phosphor-icons/react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { fetchBlogs, type Blog } from "@/lib/api";

const PER_PAGE = 6;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchBlogs(true)
      .then(setBlogs)
      .catch((e: unknown) =>
        setError(e instanceof Error ? e.message : "Failed to load blogs")
      )
      .finally(() => setLoading(false));
  }, []);

  const pageCount = Math.max(1, Math.ceil(blogs.length / PER_PAGE));
  const currentPage = Math.min(page, pageCount);
  const paginated = blogs.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  return (
    <>
      <Nav />
      <main>
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
            <Reveal>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
              >
                <House size={14} /> Back to Home
              </Link>
              <div className="mt-6 max-w-2xl">
                <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                  Blog
                </h1>
                <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-muted">
                  Notes on testing, automation, and the occasional rabbit hole.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-surface/50">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            {loading ? (
              <p className="text-sm text-muted">Loading posts…</p>
            ) : error ? (
              <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border px-6 py-20 text-center">
                <p className="font-medium">Couldn&apos;t load posts</p>
                <p className="max-w-sm text-sm text-muted">{error}</p>
              </div>
            ) : blogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border px-6 py-20 text-center">
                <Article size={36} weight="thin" className="text-muted" />
                <div>
                  <p className="font-medium">No posts yet</p>
                  <p className="mt-1 max-w-sm text-sm text-muted">
                    Posts you publish from the admin panel will appear here.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {paginated.map((blog, i) => (
                    <Reveal key={blog.id} delay={(i % 2) * 0.08}>
                      <Link href={`/blogs/${blog.slug}`}>
                        <article className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent">
                          <div className="flex items-center justify-between gap-4">
                            <span className="font-mono text-xs text-accent">
                              {formatDate(blog.created_at)}
                            </span>
                            <span className="font-mono text-xs text-muted">
                              {blog.slug}
                            </span>
                          </div>
                          <h2 className="mt-3 text-xl font-semibold tracking-tight">
                            {blog.title}
                          </h2>
                          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                            {blog.excerpt}
                          </p>
                          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                            Read More
                            <ArrowRight
                              size={15}
                              weight="bold"
                              className="transition-transform group-hover:translate-x-0.5"
                            />
                          </span>
                        </article>
                      </Link>
                    </Reveal>
                  ))}
                </div>

                {pageCount > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-4">
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
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
