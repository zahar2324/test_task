"use client";

import { auth, db } from "@/services/firebase";
import { useRoomsStore } from "@/store/useRoomStore";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PopUp from "./PopUp";

export default function CreateRoom() {
  const router = useRouter();
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPopUp, setShowPopUp] = useState(false);

  const fetchRooms = useRoomsStore((state) => state.fetchRooms);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (!user) {
        setShowPopUp(true);
      }
    });
    return () => unsub();
  }, [router]);

  const handleCreate = async () => {
    if (!roomName.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await addDoc(collection(db, "rooms"), { name: roomName, description });
      setRoomName("");
      setDescription("");
      await fetchRooms();
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handlePopUpOk = () => {
    setShowPopUp(false);
    router.push("/");
  };

  return (
    <>
      {showPopUp && (
        <PopUp
          message="Ви не залогінені! Будь ласка, увійдіть або зареєструйтесь."
          onOk={handlePopUpOk}
        />
      )}
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl w-full border border-purple-300">
          <h2 className="text-3xl font-bold text-purple-700 mb-4 text-center">Створити нову кімнату</h2>
          <p className="text-purple-500 mb-6 text-center">
            Введіть назву та короткий опис для нової переговорної кімнати.
          </p>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Назва кімнати"
              className="px-4 py-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Опис"
              className="px-4 py-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleCreate}
              disabled={loading || !roomName.trim()}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-md font-semibold transition"
            >
              {loading ? "Створюється..." : "Створити кімнату"}
            </button>
            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          </div>
        </div>
      </div>
    </>
  );
}