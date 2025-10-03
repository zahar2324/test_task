'use client';

import { useEffect } from 'react';
import { useRoomsStore } from '@/store/useRoomStore';
import { FaDoorOpen } from 'react-icons/fa'; // Іконка кімнати (не забудь встановити react-icons)

export default function RoomList() {
  const { rooms, fetchRooms } = useRoomsStore();

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl w-full border border-purple-300">
        <h2 className="text-3xl font-bold text-purple-700 mb-2 text-center">Список переговорних кімнат</h2>
        <p className="text-purple-500 text-center mb-6">Оберіть кімнату, щоб переглянути або додати бронювання</p>

        {rooms.length === 0 ? (
          <p className="text-center text-gray-500">Кімнат поки немає.</p>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {rooms.map((room) => (
              <li
                key={room.id}
                className="bg-purple-50 border border-purple-200 rounded-lg p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 mb-2">
                  <FaDoorOpen className="text-purple-500 text-xl" />
                  <h3 className="text-xl font-semibold text-purple-800">{room.name}</h3>
                </div>
                <p className="text-purple-600">{room.description || "Без опису"}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
