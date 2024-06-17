import Tiptap from "@/app/components/Tiptap";
import AddNewPost from "./add-form";

export default function page() {
  return (
    <div>
      <h1 className="text-2xl font-medium mb-6">Add new Post</h1>
      <AddNewPost></AddNewPost>
    </div>
  );
}
