"use client";

import React from "react";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
  LucideIcon,
} from "lucide-react";

type Props = {
  editor: Editor | null;
};

type ButtonProps = {
  icon: LucideIcon;
  action: () => void;
  isActive: boolean;
};

const ToolbarButton = ({ icon: Icon, action, isActive }: ButtonProps) => (
  <button
    onClick={(e) => {
      e.preventDefault();
      action();
    }}
    className={
      isActive
        ? "bg-sky-700 text-white p-2 rounded-lg"
        : "text-sky-400 p-2 hover:bg-sky-700 hover:text-white rounded-lg"
    }
  >
    <Icon className="w-5 h-5" />
  </button>
);

const Toolbar = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }

  const buttons = [
    {
      icon: Bold,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    {
      icon: Italic,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
    },
    {
      icon: Underline,
      action: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive("underline"),
    },
    {
      icon: Strikethrough,
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
    },
    {
      icon: Heading2,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: List,
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      icon: ListOrdered,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
    },
    {
      icon: Quote,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive("blockquote"),
    },
    {
      icon: Code,
      action: () => editor.chain().focus().setCode().run(),
      isActive: editor.isActive("code"),
    },
    {
      icon: Undo,
      action: () => editor.chain().focus().undo().run(),
      isActive: false,
    },
    {
      icon: Redo,
      action: () => editor.chain().focus().redo().run(),
      isActive: false,
    },
  ];

  return (
    <div
      className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start
    gap-5 w-full flex-wrap border border-gray-700"
    >
      <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap">
        {buttons.map((button, index) => (
          <ToolbarButton
            key={index}
            icon={button.icon}
            action={button.action}
            isActive={button.isActive}
          />
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
