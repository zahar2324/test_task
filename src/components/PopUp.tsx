
import React from "react";
import { PopUpProps } from "@/types/popup";

export default function PopUp({ message, onOk }: PopUpProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-700/80 via-purple-900/80 to-indigo-800/80 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 rounded-2xl shadow-2xl p-8 max-w-sm w-full border-2 border-purple-400 text-center">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">Увага!</h2>
        <p className="text-purple-700 mb-6">{message}</p>
        <button
          onClick={onOk}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold shadow transition"
        >
          OK
        </button>
      </div>
    </div>
  );
}
