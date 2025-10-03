import { onAuthStateChanged, Auth, User } from "firebase/auth";

export function listenToAuth(auth: Auth, callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}