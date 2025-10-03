import Link from "next/link";
import { isValidEmail } from "@/lib/business/validateEmail";
import { isValidPassword } from "@/lib/business/validatePassword";
import { GuestContentProps } from "@/types/GuestConten";



const GuestContent: React.FC<GuestContentProps> = ({
  loading,
  email,
  password,
  setEmail,
  setPassword,
  onSubmit,
}) => (
  <div className="mb-20 max-w-md w-full mx-auto p-6 border-2 border-purple-300 bg-white rounded-lg shadow-lg mt-12">
    <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">Create account</h1>
    {loading ? (
      <div className="text-center text-lg font-semibold text-purple-600">Loading...</div>
    ) : (
      <div>
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

export default GuestContent;