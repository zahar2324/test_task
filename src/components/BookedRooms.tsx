"use client";

import { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/services/firebase";
import { useAuthStore } from "@/store/useAuthStore";

export default function CreateBooking({ roomId }: { roomId: string }) {
  const { user } = useAuthStore();
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("09:00");
  const [status, setStatus] = useState<string | null>(null);

  const handleBooking = async () => {
    if (!user || !roomId || !date || !time) {
      setStatus("Всі поля мають бути заповнені!");
      return;
    }
    try {
      const bookingDate = new Date(date + "T" + time); 
      await addDoc(collection(db, "booking"), {
        userId: user.uid,
        room: roomId,
        date: Timestamp.fromDate(bookingDate),
        time,
      });
      setStatus("Бронювання успішно створено!");
    } catch {
      setStatus("Помилка при створенні бронювання.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Забронювати кімнату</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="mb-2 px-4 py-2 border rounded w-full"
      />
      <select
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="mb-2 px-4 py-2 border rounded w-full"
      >
        {["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"].map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      <button
        onClick={handleBooking}
        className="bg-purple-600 text-white px-4 py-2 rounded w-full font-bold"
      >
        Забронювати
      </button>
      {status && <p className="mt-2 text-purple-700">{status}</p>}
    </div>
  );
}