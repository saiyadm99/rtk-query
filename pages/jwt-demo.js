import { useState } from "react";
import { JwtAuthProvider, useJwtAuth } from "../context/JwtAuthContext";
import AuthModal from "../components/AuthModal";
import LoginForm from "../components/jwt/LoginForm";
import SignupForm from "../components/jwt/SignupForm";
import PostList from "../components/PostList";

function JwtDemoContent() {
  const { user, logout, loading } = useJwtAuth();
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow rounded p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">JWT Auth Demo</h1>
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

        <PostList canEdit={!!user} />
      </div>

      {showModal && (
        <AuthModal onClose={() => setShowModal(false)}>
          {authMode === "login" ? (
            <LoginForm
              closeModal={() => setShowModal(false)}
              switchToSignup={() => setAuthMode("signup")}
            />
          ) : (
            <SignupForm
              closeModal={() => setShowModal(false)}
              switchToLogin={() => setAuthMode("login")}
            />
          )}
        </AuthModal>
      )}
    </div>
  );
}

export default function JwtDemoPage() {
  return (
    <JwtAuthProvider>
      <JwtDemoContent />
    </JwtAuthProvider>
  );
}