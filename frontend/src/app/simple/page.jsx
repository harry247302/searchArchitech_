"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";

export function SimpleEditor({ value = "", onChange }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: "text-left",
          },
        },
      }),
      Underline,
      Heading.configure({ levels: [1, 2] }),
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"], // Allow align for both
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange && onChange(editor.getHTML());
    },
  });

  if (!mounted) return null;

  return (
    <div className="border rounded p-2">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-2 border-b pb-2">
        {/* Bold */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${editor.isActive("bold") ? "bg-gray-300" : ""} px-2 py-1 border rounded`}
        >
          B
        </button>

        {/* Italic */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${editor.isActive("italic") ? "bg-gray-300" : ""} px-2 py-1 border rounded`}
        >
          I
        </button>

        {/* Underline */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${editor.isActive("underline") ? "bg-gray-300" : ""} px-2 py-1 border rounded`}
        >
          U
        </button>

        {/* H1 */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`${editor.isActive("heading", { level: 1 }) ? "bg-gray-300" : ""} px-2 py-1 border rounded`}
        >
          H1
        </button>

        {/* H2 */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`${editor.isActive("heading", { level: 2 }) ? "bg-gray-300" : ""} px-2 py-1 border rounded`}
        >
          H2
        </button>

        {/* Bullet List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${editor.isActive("bulletList") ? "bg-gray-300" : ""} px-2 py-1 border rounded`}
        >
          • List
        </button>

        {/* Ordered List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${editor.isActive("orderedList") ? "bg-gray-300" : ""} px-2 py-1 border rounded`}
        >
          1. List
        </button>

        {/* Link */}
        <button
          type="button"
          onClick={() => {
            const previousUrl = editor.getAttributes("link").href;
            const url = window.prompt("Enter URL", previousUrl);
            if (url === null) return;
            if (url === "") {
              editor.chain().focus().unsetLink().run();
              return;
            }
            editor.chain().focus().setLink({ href: url }).run();
          }}
          className={`${editor.isActive("link") ? "bg-gray-300" : ""} px-2 py-1 border rounded`}
        >
          🔗
        </button>

        {/* Align Left */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`${editor.isActive("paragraph", { textAlign: "left" }) || editor.isActive("heading", { textAlign: "left" }) ? "bg-gray-300" : ""} px-2 py-1 border rounded`}
        >
          ⬅
        </button>

        {/* Align Center */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`${editor.isActive("paragraph", { textAlign: "center" }) || editor.isActive("heading", { textAlign: "center" }) ? "bg-gray-300" : ""} px-2 py-1 border rounded`}
        >
          ⬍
        </button>

        {/* Align Right */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`${editor.isActive("paragraph", { textAlign: "right" }) || editor.isActive("heading", { textAlign: "right" }) ? "bg-gray-300" : ""} px-2 py-1 border rounded`}
        >
          ➡
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="p-2 border rounded editor-content" />
    </div>
  );
}
