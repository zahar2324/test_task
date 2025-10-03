"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc, addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/services/firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuthStore } from "@/store/useAuthStore";

export default function RoomDetailsPage() {
  const params = useParams();
  const roomId = params?.id as string;
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("10:00");
  const [bookingStatus, setBookingStatus] = useState<string | null>(null);
const { user } = useAuthStore();
  useEffect(() => {
    const fetchRoom = async () => {
      if (!roomId) return;
      const docRef = doc(db, "rooms", roomId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setRoom({ id: docSnap.id, ...docSnap.data() });
      }
      setLoading(false);
    };
    fetchRoom();
  }, [roomId]);

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !roomId) {
      setBookingStatus("Будь ласка, виберіть дату і час.");
      return;
    }

    try {
      await addDoc(collection(db, "booking"), {
        room: roomId,
        time: selectedTime,
        createdAt: Timestamp.now(),
        date: Timestamp.fromDate(selectedDate),
        userId: user?.uid ,
      });
      setBookingStatus("Бронювання успішне!");
    } catch (error) {
      setBookingStatus("Помилка при бронюванні. Спробуйте ще раз.");
    }
  };

  if (loading) return <div className="p-10 text-center">Завантаження...</div>;
  if (!room) return <div className="p-10 text-center text-red-600">Кімната не знайдена</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8 border border-purple-300">
      <h1 className="text-3xl font-bold text-purple-700 mb-4">{room.name}</h1>
      <p className="text-purple-600 mb-6">{room.description || "Без опису"}</p>

      <div className="mb-4">
        <label className="block mb-2 font-semibold text-purple-700">Оберіть дату:</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          minDate={new Date()}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold text-purple-700">Оберіть час:</label>
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        >
          {["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"].map((time) => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleBooking}
        className="w-full bg-purple-600 text-white py-2 rounded-md font-bold hover:bg-purple-700"
      >
        Забронювати
      </button>

      {bookingStatus && (
        <p className="mt-4 text-center text-purple-700 font-medium">{bookingStatus}</p>
      )}
    </div>
  );
}