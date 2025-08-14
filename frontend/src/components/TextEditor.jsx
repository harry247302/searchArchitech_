"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react"; // <- static import!
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";

export default function TextEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Underline,
      Link,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "outline-none min-h-[150px] p-2",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  const toolbarButton = (label, action, isActive = false) => (
    <button
      type="button"
      className={`px-2 py-1 border rounded text-sm ${
        isActive ? "bg-blue-500 text-white" : "bg-gray-200"
      }`}
      onClick={action}
    >
      {label}
    </button>
  );

  if (!editor) return null;

  return (
    <div className="space-y-2 border rounded p-2 bg-white">
      <div className="flex flex-wrap gap-1 mb-2">
        {toolbarButton("B", () => editor.chain().focus().toggleBold().run(), editor.isActive("bold"))}
        {toolbarButton("I", () => editor.chain().focus().toggleItalic().run(), editor.isActive("italic"))}
        {toolbarButton("U", () => editor.chain().focus().toggleUnderline().run(), editor.isActive("underline"))}
        {toolbarButton(
          "H1",
          () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
          editor.isActive("heading", { level: 1 })
        )}
        {toolbarButton(
          "H2",
          () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
          editor.isActive("heading", { level: 2 })
        )}
        {toolbarButton(
          "UL",
          () => editor.chain().focus().toggleBulletList().run(),
          editor.isActive("bulletList")
        )}
        {toolbarButton(
          "OL",
          () => editor.chain().focus().toggleOrderedList().run(),
          editor.isActive("orderedList")
        )}
        {toolbarButton("Link", () => {
          const url = prompt("Enter URL:");
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        })}
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
