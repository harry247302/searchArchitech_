"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import StarterKit from "@tiptap/starter-kit";
import TextEditor from "@/components/TextEditor";


const EditorContent = dynamic(
  () => import('@tiptap/react').then((mod) => mod.EditorContent),
  { ssr: false }
);

const useEditor = dynamic(
  () => import('@tiptap/react').then((mod) => mod.useEditor),
  { ssr: false }
);

import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import { useDispatch, useSelector } from "react-redux";
import { createTicket } from "@/app/redux/slices/ticketSlice/TicketSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function OpenTicketForm() {

  const architectEmail = useSelector((state) => state?.architect?.architects);
  const [email, setEmail] = useState("");
  const route = useRouter()
  const [uuid, setuuid] = useState()
  console.log(architectEmail);

  useEffect(() => {
    if (architectEmail) {
      setForm((prev) => ({
        ...prev,
        architech_email: architectEmail.email || "",
        architech_uuid: architectEmail.uuid || ""
      }));
    }
  }, [architectEmail]);

  const [form, setForm] = useState({
    name: "",
    architech_email: "",
    subject: "",
    department: "Technical Support",
    relatedService: "None",
    priority: "Medium",
    message: "",
    file: null,
    architech_uuid: ""
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Underline,
      Link,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "outline-none min-h-[150px] p-2",
      },
    },
    onUpdate({ editor }) {
      setForm((prev) => ({ ...prev, message: editor.getHTML() }));
    },
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files?.name ? files[0] : value,
    }));
  };

  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(createTicket(form))
      console.log(res);
      if (res?.meta?.requestStatus === "fulfilled") {
        toast.success("Submited successfully!")
        route.push("view-tickets")
      }
    } catch (error) {
      console.log(error)
    }
  };

  const toolbarButton = (label, action, isActive = false) => (
    <button
      type="button"
      className={`px-2 py-1 border rounded text-sm ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      onClick={action}
    >
      {label}
    </button>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-8xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 mt-10"
    >
      <h2 className="text-2xl font-bold">Open Ticket</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.architech_email}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />

      </div>

      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={form.subject}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <select
          name="department"
          value={form.department}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option>Technical Support</option>
          <option>Billing</option>
          <option>Sales</option>
        </select>

        <select
          name="relatedService"
          value={form.relatedService}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option>None</option>
          <option>Hosting</option>
          <option>Domain</option>
        </select>

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium">Message</label>
        <TextEditor
          content={form.message}
          onChange={(html) => setForm((prev) => ({ ...prev, message: html }))}
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Attachments</label>
        <input
          type="file"
          name="file"
          accept=".jpg,.jpeg,.png,.gif"
          onChange={handleChange}
          className="block w-full text-sm text-gray-600"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
        <button
          type="button"
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
