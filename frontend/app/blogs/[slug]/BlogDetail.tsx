"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { fetchBlogBySlug, type Blog } from "@/lib/api";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchBlogBySlug(slug)
      .then((data) => {
        if (!cancelled) setBlog(data);
      })
      .catch((e: unknown) => {
        if (!cancelled)
          setError(e instanceof Error ? e.message : "Failed to load post");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <>
      <Nav />
      <main>
        <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>

          {loading ? (
            <p className="mt-10 text-sm text-muted">Loading post…</p>
          ) : error ? (
            <div className="mt-10 rounded-2xl border border-dashed border-border px-6 py-16 text-center">
              <p className="font-medium">Post not found</p>
              <p className="mt-1 text-sm text-muted">{error}</p>
            </div>
          ) : blog ? (
            <>
              <header className="mt-8 border-b border-border pb-8">
                <span className="font-mono text-xs text-accent">
                  {formatDate(blog.created_at)}
                </span>
                <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
                  {blog.title}
                </h1>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  {blog.excerpt}
                </p>
              </header>
              <div
                className="prose prose-neutral mx-auto mt-10 max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </>
          ) : null}
        </article>
      </main>
      <Footer />
    </>
  );
}
