import { AuthContentProps } from "@/types/AuthContent";
import React from "react";



const AuthContent: React.FC<AuthContentProps> = ({ user, handleLogout }) => (
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
);

export default AuthContent;