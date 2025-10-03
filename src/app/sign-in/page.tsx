"use client";

import { auth } from "@/services/firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SignIn() {
  const router = useRouter();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  // 🔍 Real-time validation
  useEffect(() => {
    if (!email) {
      setEmailError("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError(null);
    }
  }, [email]);

  useEffect(() => {
    if (!password) {
      setPasswordError("Password is required");
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError(null);
    }
  }, [password]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emailError || passwordError) return;
    await signInWithEmailAndPassword(email, password);
  };

  return (
    <form
  onSubmit={onSubmit}
  className="max-w-md w-full mx-auto p-6 border-2 border-purple-300 bg-white rounded-lg shadow-lg mt-12 flex flex-col gap-4"
>
  <h1 className="text-3xl font-bold text-center text-purple-700">Sign In</h1>

  <div>
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className={`w-full px-4 py-3 rounded-md border text-lg bg-purple-50 placeholder-purple-300 ${
        emailError
          ? "border-red-500 focus:ring-red-500"
          : "border-purple-300 focus:ring-purple-500"
      } focus:outline-none focus:ring-2`}
      aria-invalid={emailError ? "true" : "false"}
    />
    {emailError && (
      <p className="text-red-600 text-sm mt-1">{emailError}</p>
    )}
  </div>

  <div>
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className={`w-full px-4 py-3 rounded-md border text-lg bg-purple-50 placeholder-purple-300 ${
        passwordError
          ? "border-red-500 focus:ring-red-500"
          : "border-purple-300 focus:ring-purple-500"
      } focus:outline-none focus:ring-2`}
      aria-invalid={passwordError ? "true" : "false"}
    />
    {passwordError && (
      <p className="text-red-600 text-sm mt-1">{passwordError}</p>
    )}
  </div>

  <button
    type="submit"
    disabled={loading || emailError !== null || passwordError !== null}
    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-bold transition disabled:bg-purple-300"
  >
    {loading ? "Loading..." : "Sign In"}
  </button>

  {error && (
    <p className="text-red-600 text-center mt-2">{error.message}</p>
  )}
</form>

  );
}