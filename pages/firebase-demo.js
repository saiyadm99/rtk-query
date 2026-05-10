import { useState } from "react";
import { FirebaseAuthProvider, useFirebaseAuth } from "../context/FirebaseAuthContext";
import AuthModal from "../components/AuthModal";
import LoginForm from "../components/firebase/LoginForm";
import SignupForm from "../components/firebase/SignupForm";
import PostList from "../components/PostList";

function FirebaseDemoContent() {
  const { user, logout, loading } = useFirebaseAuth();
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
            <h1 className="text-2xl font-bold">Firebase Auth Demo</h1>

            {user && (
              <p className="text-sm text-gray-500">
                Logged in as: {user.email}
              </p>
            )}
          </div>

          {user ? (
            <button
              onClick={logout}
							type="button"
              className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                setAuthMode("login");
                setShowModal(true);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
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

export default function FirebaseDemoPage () {
	return(
		<FirebaseAuthProvider>
			<FirebaseDemoContent/>
		</FirebaseAuthProvider>
	)
}