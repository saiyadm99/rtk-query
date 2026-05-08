import { useState } from "react";

import { useJwtAuth } from "../../context/JwtAuthContext";

export default function SignupForm({
  closeModal,
  switchToLogin,
}) {
  const { signup } =
    useJwtAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signup({
      email,
      password,
    });

    if (result.success) {
      closeModal();
    } else {
      setError(result.message);
    }
  };

  return (
    <div>

      <h2 className="text-3xl font-bold mb-6">
        JWT Signup
      </h2>

      <form
        onSubmit={handleSubmit}
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
          className="bg-green-500 text-white w-full py-3 rounded"
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

        Already have an account?
        {" "}

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