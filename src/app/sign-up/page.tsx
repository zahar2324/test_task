"use client";

import { auth } from "@/services/firebase";
import { useCreateUserWithEmailAndPassword, useSendEmailVerification } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SignUp() {
  const router = useRouter();
  const [createUser, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const [sendEmailVerification] = useSendEmailVerification(auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    async function verifyEmailAndRedirect() {
      if (user) {
        await sendEmailVerification();
        router.push("/");
      }
    }
    verifyEmailAndRedirect();
  }, [user, sendEmailVerification, router]);

  const onSubmit = async () => {
    await createUser(email, password);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1>Create account</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="text-xl px-4 py-2 rounded-md border border-gray-300"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="text-xl px-4 py-2 rounded-md border border-gray-300"
      />
      <button
        onClick={onSubmit}
        disabled={loading}
        className="bg-yellow-500 text-black px-4 py-2 rounded-md font-bold"
      >
        {loading ? "Loading..." : "Sign Up"}
      </button>
      {error && <p className="text-red-600">{error.message}</p>}
    </div>
  );
}
