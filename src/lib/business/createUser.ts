import type { UserCredential } from "firebase/auth";

type CreateUserFn = (email: string, password: string) => Promise<UserCredential | null>;
type SendEmailVerificationFn = () => Promise<boolean>;

export async function registerUser(
  email: string,
  password: string,
  createUser: CreateUserFn,
  sendEmailVerification: SendEmailVerificationFn
) {
  const userCredential = await createUser(email, password);
  if (userCredential) {
    await sendEmailVerification();
    return userCredential.user;
  }
  return null;
}
