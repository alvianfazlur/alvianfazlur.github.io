import BlogDetail from "./BlogDetail";

export function generateStaticParams() {
  // With output: export, at least one param is required. Real posts are
  // fetched client-side from the backend at runtime, so this placeholder
  // simply satisfies the build.
  return [{ slug: "__placeholder__" }];
}

export default function Page() {
  return <BlogDetail />;
}