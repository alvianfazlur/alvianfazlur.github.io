"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Code,
  CodeBlock,
  ListBullets,
  ListNumbers,
  Quotes,
  TextB,
  TextH,
  TextItalic,
  TextStrikethrough,
  TextT,
  TextUnderline,
} from "@phosphor-icons/react";

type Tool = {
  icon: React.ElementType;
  label: string;
  action: (e: Editor) => void;
  isActive: (e: Editor) => boolean;
};

function ToolbarButton({ tool, editor }: { tool: Tool; editor: Editor }) {
  return (
    <button
      type="button"
      title={tool.label}
      onMouseDown={(e) => e.preventDefault()}
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const within =
          e.clientX >= r.left &&
          e.clientX <= r.right &&
          e.clientY >= r.top &&
          e.clientY <= r.bottom;
        if (!within && e.detail !== 0) return;
        tool.action(editor);
      }}
      className={`rounded-md p-1.5 transition-colors ${
        tool.isActive(editor)
          ? "bg-accent text-emerald-950"
          : "text-muted hover:bg-accent-soft hover:text-ink"
      }`}
    >
      <tool.icon size={16} weight="bold" />
    </button>
  );
}

const tools: Tool[] = [
  {
    icon: TextB,
    label: "Bold",
    action: (e) => e.chain().focus().toggleBold().run(),
    isActive: (e) => e.isActive("bold"),
  },
  {
    icon: TextItalic,
    label: "Italic",
    action: (e) => e.chain().focus().toggleItalic().run(),
    isActive: (e) => e.isActive("italic"),
  },
  {
    icon: TextUnderline,
    label: "Underline",
    action: (e) => e.chain().focus().toggleUnderline().run(),
    isActive: (e) => e.isActive("underline"),
  },
  {
    icon: TextStrikethrough,
    label: "Strikethrough",
    action: (e) => e.chain().focus().toggleStrike().run(),
    isActive: (e) => e.isActive("strike"),
  },
  {
    icon: TextT,
    label: "Heading 1",
    action: (e) =>
      e.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: (e) => e.isActive("heading", { level: 1 }),
  },
  {
    icon: TextH,
    label: "Heading 2",
    action: (e) =>
      e.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: (e) => e.isActive("heading", { level: 2 }),
  },
  {
    icon: ListBullets,
    label: "Bullet List",
    action: (e) => e.chain().focus().toggleBulletList().run(),
    isActive: (e) => e.isActive("bulletList"),
  },
  {
    icon: ListNumbers,
    label: "Numbered List",
    action: (e) => e.chain().focus().toggleOrderedList().run(),
    isActive: (e) => e.isActive("orderedList"),
  },
  {
    icon: Quotes,
    label: "Blockquote",
    action: (e) => e.chain().focus().toggleBlockquote().run(),
    isActive: (e) => e.isActive("blockquote"),
  },
  {
    icon: Code,
    label: "Inline Code",
    action: (e) => e.chain().focus().toggleCode().run(),
    isActive: (e) => e.isActive("code"),
  },
  {
    icon: CodeBlock,
    label: "Code Block",
    action: (e) => e.chain().focus().toggleCodeBlock().run(),
    isActive: (e) => e.isActive("codeBlock"),
  },
];

export default function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    immediatelyRender: true,
    extensions: [StarterKit],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose prose-neutral max-w-none dark:prose-invert min-h-[280px] px-3 py-3 outline-none",
      },
    },
    onUpdate: ({ editor: e }) => onChange(e.getHTML()),
  });

  if (!editor) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background focus-within:border-accent">
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-surface px-2 py-2">
        {tools.map((t) => (
          <ToolbarButton key={t.label} tool={t} editor={editor} />
        ))}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
