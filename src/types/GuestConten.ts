export interface GuestContentProps {
  loading: boolean;
  email: string;
  password: string;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  onSubmit: () => void;
}