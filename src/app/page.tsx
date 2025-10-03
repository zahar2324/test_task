"use client";

import { auth } from "@/services/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useCreateUserWithEmailAndPassword, useSendEmailVerification } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";

import Hero from "@/components/Hero";

import { logout } from "@/lib/business/logout";
import { listenToAuth } from "@/lib/business/listenToAuth";

import AuthContent from "@/components/AuthContent";
import GuestContent from "@/components/GuestContent";

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

  

  return (
    <div>
      <div className="mt-10">
        <Hero />
      </div>

      {user ? <AuthContent user={user} handleLogout={handleLogout} /> : <GuestContent
        loading={loading}
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        onSubmit={onSubmit}
      />}
    </div>
  );
}
