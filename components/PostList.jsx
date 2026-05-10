import { useState } from "react";
import {
  useGetPostsQuery,
  useAddPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} from "../services/postsApi";

export default function PostList({ canEdit }) {
  const { data = [], isLoading } = useGetPostsQuery();
  const [addPost] = useAddPostMutation();
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAdd = async () => {
    if (!title) return;
		
    await addPost({ title }).unwrap();
    setTitle("");
  };

  const startEdit = (post) => {
    setEditingId(post.id);
    setEditText(post.title);
  };

  const saveEdit = async (id) => {
    await updatePost({
      id,
      title: editText,
    }).unwrap();

    setEditingId(null);
  };

  if (isLoading) {
    return <div className="text-center">Loading posts...</div>;
  }

  return (
    <div>
      {canEdit && (
        <div className="flex gap-2 mb-6">
          <input
            className="border p-2 flex-1 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
          />

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      )}

      <ul className="space-y-3">
        {data.map((post) => (
          <li
            key={post.id}
            className="border p-3 rounded flex justify-between items-center"
          >
            {editingId === post.id ? (
              <input
                className="border p-1 flex-1 mr-2"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <span className="flex-1">{post.title}</span>
            )}

            {canEdit && (
              <div className="flex gap-2">
                {editingId === post.id ? (
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded cursor-pointer"
                    onClick={() => saveEdit(post.id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded cursor-pointer"
                    onClick={() => startEdit(post)}
                  >
                    Edit
                  </button>
                )}

                <button
                  className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
                  onClick={() => deletePost(post.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}