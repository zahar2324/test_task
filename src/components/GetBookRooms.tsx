"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase";

import { Booking, Room } from "@/types/GetBookRooms";

export default function GetBookedRooms({ userId }: { userId: string }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<{ [id: string]: Room }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const querySnapshot = await getDocs(collection(db, "booking"));
      const userBookings: Booking[] = [];

      for (const docSnap of querySnapshot.docs) {
        const data = docSnap.data();
        if (data.userId === userId) {
          userBookings.push({ id: docSnap.id, ...data } as Booking);

      
          if (!rooms[data.room]) {
            const roomRef = doc(db, "rooms", data.room);
            const roomSnap = await getDoc(roomRef);
            if (roomSnap.exists()) {
              setRooms((prev) => ({
                ...prev,
                [data.room]: { id: roomSnap.id, ...roomSnap.data() } as Room,
              }));
            }
          }
        }
      }

      setBookings(userBookings);
      setLoading(false);
    };

    fetchBookings();
  }, [userId]);

  if (loading) return <div className="p-10 text-center">Завантаження...</div>;
  if (bookings.length === 0) return <div className="p-10 text-center text-purple-600">У вас немає бронювань.</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8 border border-purple-300">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Мої заброньовані кімнати</h2>
      <ul className="space-y-6">
        {bookings.map((booking) => (
          <li key={booking.id} className="border-b pb-4">
            <div className="mb-2">
              <span className="font-semibold text-purple-800">
                Кімната: {rooms[booking.room]?.name || booking.room}
              </span>
              <p className="text-purple-600">
                Опис: {rooms[booking.room]?.description || "Без опису"}
              </p>
            </div>
            <p>
              Дата: {booking.date?.toDate ? booking.date.toDate().toLocaleDateString() : ""}
            </p>
            <p>Час: {booking.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
