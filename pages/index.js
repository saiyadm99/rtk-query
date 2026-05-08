import { useState } from "react";
import {
  useGetPostsQuery,
  useAddPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} from "../services/postsApi";
import { useFirebaseAuth } from "../context/FirebaseAuthContext";
import AuthModal from "../components/AuthModal";
import LoginForm from "../components/firebase/LoginForm";
import SignupForm from "../components/firebase/SignupForm";

export default function Home() {
  const { user, logout, loading } = useFirebaseAuth();

  const { data = [], isLoading } = useGetPostsQuery();

  const [addPost] = useAddPostMutation();
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");

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

  if (loading || isLoading) {
    return (
      <div className="p-6 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow rounded p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              RTK
            </h1>

            {user && (
              <p className="text-sm text-gray-500">
                Logged in as: {user.email}
              </p>
            )}
          </div>

          {user ? (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                setAuthMode("login");
                setShowModal(true);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Login
            </button>
          )}
        </div>

        <div className="flex gap-2 mb-6">
          <input
            className="border p-2 flex-1 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
          />

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>

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
                  onChange={(e) =>
                    setEditText(e.target.value)
                  }
                />
              ) : (
                <span className="flex-1">
                  {post.title}
                </span>
              )}

              <div className="flex gap-2">
                {editingId === post.id ? (
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => saveEdit(post.id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => startEdit(post)}
                  >
                    Edit
                  </button>
                )}

                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deletePost(post.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showModal && (
        <AuthModal
          onClose={() => setShowModal(false)}
        >
          {authMode === "login" ? (
            <LoginForm
              closeModal={() =>
                setShowModal(false)
              }
              switchToSignup={() =>
                setAuthMode("signup")
              }
            />
          ) : (
            <SignupForm
              closeModal={() =>
                setShowModal(false)
              }
              switchToLogin={() =>
                setAuthMode("login")
              }
            />
          )}
        </AuthModal>
      )}
    </div>
  );
}