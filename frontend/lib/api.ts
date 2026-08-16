// Api calls go through the Next.js dev rewrite proxy (/api -> backend).
export type Item = {
  id: number;
  name: string;
};

export async function fetchItems(): Promise<Item[]> {
  const res = await fetch(`/api/items`);
  if (!res.ok) throw new Error("Failed to fetch items");
  return res.json();
}

export async function createItem(name: string): Promise<Item> {
  const res = await fetch(`/api/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Failed to create item");
  return res.json();
}

export type Blog = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string | null;
  published: boolean;
  created_at: string;
};

export type BlogInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string | null;
  published?: boolean;
};

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let detail = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.detail) detail = body.detail;
    } catch {
      // ignore parse errors, keep status fallback
    }
    throw new Error(detail);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export async function fetchBlogs(publishedOnly = true): Promise<Blog[]> {
  const res = await fetch(`/api/blogs?published_only=${publishedOnly}`);
  return handle(res);
}

export async function fetchBlogBySlug(slug: string): Promise<Blog> {
  const res = await fetch(`/api/blogs/slug/${slug}`);
  return handle(res);
}

export async function createBlog(input: BlogInput): Promise<Blog> {
  const res = await fetch(`/api/blogs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return handle(res);
}

export async function updateBlog(id: number, input: BlogInput): Promise<Blog> {
  const res = await fetch(`/api/blogs/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return handle(res);
}

export async function deleteBlog(id: number): Promise<void> {
  const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
  return handle(res);
}