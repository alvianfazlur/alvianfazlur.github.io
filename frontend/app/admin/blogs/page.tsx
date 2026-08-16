"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Article,
  ArrowLeft,
  Trash,
  PencilSimple,
  Plus,
  SignOut,
} from "@phosphor-icons/react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RichTextEditor from "@/components/RichTextEditor";
import {
  fetchBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  type Blog,
  type BlogInput,
} from "@/lib/api";

const AUTH_KEY = "admin_auth";

type FormState = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  published: boolean;
};

const emptyForm: FormState = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  image: "",
  published: true,
};

function toSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AdminBlogsPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    // Rehydrate auth from sessionStorage after mount to avoid SSR mismatch.
    if (typeof window !== "undefined" && sessionStorage.getItem(AUTH_KEY)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional mount-only sync with sessionStorage
      setAuthed(true);
    }
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setBlogs(await fetchBlogs(false));
      setError(null);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authed) return;
    let cancelled = false;
    fetchBlogs(false)
      .then((data) => {
        if (!cancelled) setBlogs(data);
      })
      .catch((e: unknown) => {
        if (!cancelled)
          setError(e instanceof Error ? e.message : "Failed to load blogs");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [authed]);

  const slugPreview = useMemo(() => toSlug(form.title), [form.title]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const body = await res.json();
      if (!res.ok || !body.ok) {
        throw new Error(body.detail ?? "Login failed");
      }
      sessionStorage.setItem(AUTH_KEY, "1");
      setAuthed(true);
    } catch (e: unknown) {
      setAuthError(e instanceof Error ? e.message : "Login failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setNotice(null);
    try {
      const input: BlogInput = {
        title: form.title,
        slug: form.slug || slugPreview,
        excerpt: form.excerpt,
        content: form.content,
        image: form.image || null,
        published: form.published,
      };
      if (editingId) {
        await updateBlog(editingId, input);
        setNotice("Post updated.");
      } else {
        await createBlog(input);
        setNotice("Post created.");
      }
      setForm(emptyForm);
      setEditingId(null);
      await load();
    } catch (e: unknown) {
      setNotice(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (blog: Blog) => {
    if (!window.confirm(`Delete "${blog.title}"?`)) return;
    try {
      await deleteBlog(blog.id);
      setNotice("Post deleted.");
      if (editingId === blog.id) {
        setForm(emptyForm);
        setEditingId(null);
      }
      await load();
    } catch (e: unknown) {
      setNotice(e instanceof Error ? e.message : "Delete failed");
    }
  };

  const startEdit = (blog: Blog) => {
    setEditingId(blog.id);
    setForm({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image ?? "",
      published: blog.published,
    });
    setNotice(null);
  };

  if (!authed) {
    return (
      <>
        <Nav />
        <main className="flex min-h-[60vh] items-center justify-center px-6">
          <form
            onSubmit={handleLogin}
            className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8"
          >
            <Article size={28} weight="thin" className="text-accent" />
            <h1 className="mt-4 text-xl font-semibold tracking-tight">
              Admin access
            </h1>
            <p className="mt-1 text-sm text-muted">
              Enter the admin password to manage blog posts.
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              className="mt-6 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
            />
            {authError && <p className="mt-3 text-sm text-red-500">{authError}</p>}
            <button
              type="submit"
              disabled={authLoading}
              className="mt-4 w-full rounded-full bg-accent px-4 py-2 text-sm font-semibold text-emerald-950 shadow-sm active:scale-[0.98] disabled:opacity-60"
            >
              {authLoading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <main>
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
                >
                  <ArrowLeft size={14} /> Back to Blog
                </Link>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                  Manage Blog
                </h1>
                <p className="mt-3 text-sm text-muted">
                  {blogs.length} post{blogs.length === 1 ? "" : "s"} ·{" "}
                  {blogs.filter((b) => b.published).length} published
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-ink"
              >
                <SignOut size={16} /> Log Out
              </button>
            </div>
          </div>
        </section>

        <section className="bg-surface/50">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            {notice && (
              <p className="mb-8 rounded-lg border border-accent/30 bg-accent-soft px-4 py-3 text-sm text-ink">
                {notice}
              </p>
            )}

            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border bg-surface p-6 md:p-8"
            >
              <div className="flex items-center gap-2">
                <Plus size={18} className="text-accent" weight="bold" />
                <h2 className="font-semibold">
                  {editingId ? "Edit Post" : "New Post"}
                </h2>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-sm">
                  <span className="font-medium">Title</span>
                  <input
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    placeholder="Post title"
                    required
                    className="rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-accent"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-sm">
                  <span className="font-medium">
                    Slug{" "}
                    <span className="font-mono text-xs text-muted">
                      (blank = auto)
                    </span>
                  </span>
                  <input
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder={slugPreview || "my-post-slug"}
                    className="rounded-lg border border-border bg-background px-3 py-2 font-mono text-xs outline-none focus:border-accent"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-sm md:col-span-2">
                  <span className="font-medium">Excerpt</span>
                  <textarea
                    value={form.excerpt}
                    onChange={(e) =>
                      setForm({ ...form, excerpt: e.target.value })
                    }
                    placeholder="Short summary shown on the blog listing"
                    rows={2}
                    required
                    className="rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-accent"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-sm md:col-span-2">
                  <span className="font-medium">Content</span>
                  <RichTextEditor
                    key={editingId ?? "new"}
                    value={form.content}
                    onChange={(html) => setForm({ ...form, content: html })}
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-sm">
                  <span className="font-medium">Image URL</span>
                  <input
                    value={form.image}
                    onChange={(e) =>
                      setForm({ ...form, image: e.target.value })
                    }
                    placeholder="https://…/cover.png (optional)"
                    className="rounded-lg border border-border bg-background px-3 py-2 font-mono text-xs outline-none focus:border-accent"
                  />
                </label>

                <label className="flex items-end gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) =>
                      setForm({ ...form, published: e.target.checked })
                    }
                    className="mb-2 size-4 accent-emerald-600"
                  />
                  <span className="mb-2 font-medium">Published</span>
                </label>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-emerald-950 shadow-sm active:scale-[0.98] disabled:opacity-60"
                >
                  {saving
                    ? "Saving…"
                    : editingId
                      ? "Save Changes"
                      : "Create Post"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setForm(emptyForm);
                    }}
                    className="rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-ink"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div className="mt-12">
              <h2 className="font-semibold">All Posts</h2>
              {loading ? (
                <p className="mt-4 text-sm text-muted">Loading posts…</p>
              ) : error ? (
                <p className="mt-4 text-sm text-red-500">{error}</p>
              ) : blogs.length === 0 ? (
                <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border px-6 py-16 text-center">
                  <Article size={32} weight="thin" className="text-muted" />
                  <p className="text-sm text-muted">
                    No posts yet. Create your first one above.
                  </p>
                </div>
              ) : (
                <ul className="mt-6 divide-y divide-border rounded-2xl border border-border bg-surface">
                  {blogs.map((blog) => (
                    <li
                      key={blog.id}
                      className="flex flex-wrap items-center justify-between gap-4 px-6 py-4"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-2 py-0.5 font-mono text-[11px] ${
                              blog.published
                                ? "bg-accent-soft text-accent"
                                : "bg-muted/10 text-muted"
                            }`}
                          >
                            {blog.published ? "Published" : "Draft"}
                          </span>
                          <span className="font-mono text-xs text-muted">
                            {formatDate(blog.created_at)}
                          </span>
                        </div>
                        <h3 className="mt-1 truncate font-medium">
                          {blog.title}
                        </h3>
                        <p className="mt-0.5 truncate font-mono text-xs text-muted">
                          /{blog.slug}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEdit(blog)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-ink"
                        >
                          <PencilSimple size={14} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(blog)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-red-500 transition-colors hover:border-red-500/40"
                        >
                          <Trash size={14} /> Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
