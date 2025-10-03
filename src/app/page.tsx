"use client";

import { auth } from "@/services/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useCreateUserWithEmailAndPassword, useSendEmailVerification } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import AuthWrapper from "@/components/AuthWrapper";
import Hero from "@/components/Hero";
import List from "@/components/List";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);

  const [createUser] = useCreateUserWithEmailAndPassword(auth);
  const [sendEmailVerification] = useSendEmailVerification(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const onSubmit = async () => {
    setLoading(true);
    const userCredential = await createUser(email, password);
    if (userCredential) {
      await sendEmailVerification();
      setUser(userCredential.user);
      router.push("/");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    router.push("/sign-in");
  };

  // --- Окремі блоки для різних станів ---
  const AuthContent = (
    <div className="max-w-md w-full mx-auto p-6 border-2 border-gray-400 rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.email}!</h1>
      <p className="mb-6">You are logged in.</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-600 transition"
      >
        Log Out
      </button>
      <Hero />
    </div>
  );

  const GuestContent = (
    <div className="max-w-md w-full mx-auto p-6 border-2 border-gray-400 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Create account</h1>
      {loading ? (
        <div className="text-center text-lg font-semibold">Loading...</div>
      ) : (
        <>
          <div className="mb-4">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
              required
              className={`w-full px-4 py-2 rounded-md border text-lg ${
                !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                  ? "border-gray-300 focus:ring-blue-500 focus:outline-none focus:ring-2"
                  : "border-red-500 focus:ring-red-500 focus:outline-none focus:ring-2"
              }`}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password (min. 6 characters)"
              required
              minLength={6}
              className={`w-full px-4 py-2 rounded-md border text-lg ${
                password.length >= 6 || password.length === 0
                  ? "border-gray-300 focus:ring-blue-500 focus:outline-none focus:ring-2"
                  : "border-red-500 focus:ring-red-500 focus:outline-none focus:ring-2"
              }`}
            />
          </div>
          <button
            className="w-full bg-yellow-500 text-black py-2 rounded-md font-bold disabled:bg-yellow-300"
            onClick={onSubmit}
            disabled={
              loading ||
              !email ||
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
              password.length < 6
            }
          >
            SIGN UP
          </button>
          <div className="flex flex-col items-center gap-2 mt-6">
            <p>Already have an account?</p>
            <Link href="/sign-in" passHref>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition">
                Sign In
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );

  // --- Один return, умовний рендер ---
  return (
    <div>
      {/* Спільний контент */}
      <List/>
      {user ? AuthContent : GuestContent}
    </div>
  );
}