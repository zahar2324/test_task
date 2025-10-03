"use client";

import { auth } from "@/services/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useCreateUserWithEmailAndPassword, useSendEmailVerification } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";

import Hero from "@/components/Hero";
import {registerUser} from "@/lib/business/createUser";
import CreateRoom from "@/components/CreateRoom";
import { logout } from "@/lib/business/logout";
import { listenToAuth } from "@/lib/business/listenToAuth";
import { isValidEmail } from "@/lib/business/validateEmail";
import {isValidPassword} from "@/lib/business/validatePassword";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);

  const [createUser] = useCreateUserWithEmailAndPassword(auth);
  const [sendEmailVerification] = useSendEmailVerification(auth);

  useEffect(() => {
    const unsubscribe = listenToAuth(auth, (currentUser) => {
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
    await logout(auth);
    setUser(null);
    router.push("/sign-in");
  };

  const AuthContent = (
    <>
      <div className="mb-30 mt-30 max-w-md w-full mx-auto p-8 border-2 border-purple-400 rounded-xl shadow-lg bg-purple-50 text-center">
        <h1 className="text-3xl font-extrabold mb-5 text-purple-700">
          Welcome, {user?.email}!
        </h1>
        <p className="mb-8 text-purple-600 text-lg font-medium">
          You are logged in.
        </p>

        <button
          onClick={handleLogout}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
        >
          Log Out
        </button>
      </div>
    </>
  );

  const GuestContent = (
    <div className="mb-20 max-w-md w-full mx-auto p-6 border-2 border-purple-300 bg-white rounded-lg shadow-lg mt-12">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">Create account</h1>

      {loading ? (
        <div className="text-center text-lg font-semibold text-purple-600">Loading...</div>
      ) : (
        <div className="">
          <div className="mb-4">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
              required
              className={`w-full px-4 py-3 rounded-md border text-lg bg-purple-50 placeholder-purple-300 ${
                !email || isValidEmail(email)
                  ? "border-purple-300 focus:ring-purple-500 focus:outline-none focus:ring-2"
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
              className={`w-full px-4 py-3 rounded-md border text-lg bg-purple-50 placeholder-purple-300 ${
                isValidPassword(password) || password.length === 0
                  ? "border-purple-300 focus:ring-purple-500 focus:outline-none focus:ring-2"
                  : "border-red-500 focus:ring-red-500 focus:outline-none focus:ring-2"
              }`}
            />
          </div>

          <button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-bold transition disabled:bg-purple-300"
            onClick={onSubmit}
            disabled={
              loading ||
              !email ||
              !isValidEmail(email) ||
              !isValidPassword(password)
            }
          >
            SIGN UP
          </button>

          <div className="flex flex-col items-center gap-2 mt-6">
            <p className="text-purple-500">Already have an account?</p>
            <Link href="/sign-in" passHref>
              <button className="bg-purple-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-purple-600 transition">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <div className="mt-10">
        <Hero />
      </div>

      {user ? AuthContent : GuestContent}
    </div>
  );
}
