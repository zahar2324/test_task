// /components/AuthWrapper.tsx
"use client";

import { useState, useEffect, ReactNode } from "react";
import { auth } from "@/services/firebase";
import { onAuthStateChanged } from "firebase/auth";

interface AuthWrapperProps {
  children: ReactNode; 
  fallback?: ReactNode; 
}

export default function AuthWrapper({ children, fallback = null }: AuthWrapperProps) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>; // спінер чи просто Loading

  return <>{user ? children : fallback}</>;
}
