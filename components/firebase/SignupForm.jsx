import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function SignupForm({
  switchToLogin,
  closeModal,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setError("");

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      closeModal();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">
        Signup
      </h2>

      <form
        onSubmit={handleSignup}
        className="space-y-4"
      >
        <input
          type="email"
          placeholder="Email"
          className="border p-3 w-full rounded"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 w-full rounded"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white w-full py-3 rounded"
        >
          Signup
        </button>
      </form>

      {error && (
        <p className="text-red-500 mt-4">
          {error}
        </p>
      )}

      <p className="mt-6 text-center">
        Already have an account?{" "}

        <button
          onClick={switchToLogin}
          className="text-blue-500"
        >
          Login
        </button>
      </p>
    </div>
  );
}