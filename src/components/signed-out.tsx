import { auth } from "@/services/firebase";
import { ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {Props} from "@/types/signedOut";

export const SignedOut = ({ children }: Props) => {
  const [user] = useAuthState(auth);

  if (user) return null;

  return <>{children}</>;
};