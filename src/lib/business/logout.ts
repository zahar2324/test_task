import { signOut } from "firebase/auth";
import { Auth } from "firebase/auth";

export async function logout(auth: Auth) {
  await signOut(auth);
}
