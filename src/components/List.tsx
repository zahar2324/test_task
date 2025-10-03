"use client";

import { useEffect, useState } from "react";
import { useRoomsStore } from "@/store/useRoomStore";
import { FaDoorOpen, FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "@/services/firebase";
import PopUp from "./PopUp";
import Skeleton from "./Skeleton";

export default function RoomList() {
  const { rooms, fetchRooms } = useRoomsStore();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [showPopUp, setShowPopUp] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchRooms().finally(() => setLoading(false));
  }, [fetchRooms]);

  const confirmDelete = (id: string) => {
    setRoomToDelete(id);
    setShowPopUp(true);
  };

  const handleDelete = async () => {
    if (!roomToDelete) return;
    setDeletingId(roomToDelete);
    setError(null);
    setShowPopUp(false);
    try {
      await deleteDoc(doc(db, "rooms", roomToDelete));
      await fetchRooms();
    } catch (err: any) {
      setError(err.message);
    }
    setDeletingId(null);
    setRoomToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowPopUp(false);
    setRoomToDelete(null);
  };

  const startEditing = (room: { id: string; name: string; description?: string }) => {
    setEditingId(room.id);
    setEditName(room.name);
    setEditDescription(room.description || "");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName("");
    setEditDescription("");
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    if (!editName.trim()) {
      setError("Назва кімнати не може бути пустою");
      return;
    }
    setUpdating(true);
    setError(null);

    try {
      await updateDoc(doc(db, "rooms", editingId), {
        name: editName.trim(),
        description: editDescription.trim(),
      });
      await fetchRooms();
      cancelEditing();
    } catch (err: any) {
      setError(err.message);
    }
    setUpdating(false);
  };

  return (
    <>
      {showPopUp && (
        <PopUp
          message="Ви впевнені, що хочете видалити цю кімнату?"
          onOk={handleDelete}
          onCancel={handleCancelDelete}
        />
      )}

      <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl w-full border border-purple-300">
          <h2 className="text-3xl font-bold text-purple-700 mb-2 text-center">
            Список переговорних кімнат
          </h2>
          <p className="text-purple-500 text-center mb-6">
            Оберіть кімнату, щоб переглянути або додати бронювання
          </p>

          {error && (
            <p className="text-red-600 text-center mb-4 font-semibold">{error}</p>
          )}

          {loading ? (
            <Skeleton />
          ) : rooms.length === 0 ? (
            <p className="text-center text-gray-500">Кімнат поки немає.</p>
          ) : (
            <ul className="grid gap-4 md:grid-cols-2">
              {rooms.map((room) => (
                <li
                  key={room.id}
                  className="bg-purple-50 border border-purple-200 rounded-lg p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <FaDoorOpen className="text-purple-500 text-xl" />

                      {editingId === room.id ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="border border-purple-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-800 font-semibold w-full"
                        />
                      ) : (
                        <h3 className="text-xl font-semibold text-purple-800">
                          {room.name}
                        </h3>
                      )}
                    </div>

                    {editingId === room.id ? (
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="border border-purple-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-600 w-full resize-none"
                        rows={3}
                        placeholder="Опис кімнати"
                      />
                    ) : (
                      <p className="text-purple-600">
                        {room.description || "Без опису"}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 self-end flex gap-2">
                    {editingId === room.id ? (
                      <>
                        <button
                          onClick={handleUpdate}
                          disabled={updating || !editName.trim()}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold flex items-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Оновити кімнату"
                        >
                          <FaSave />
                          {updating ? "Оновлюємо..." : "Оновити"}
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md font-semibold flex items-center gap-2 transition"
                          title="Скасувати"
                        >
                          <FaTimes />
                          Відміна
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(room)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md flex items-center gap-2 transition"
                          title="Редагувати кімнату"
                        >
                          <FaEdit />
                          Редагувати
                        </button>

                        <button
                          onClick={() => confirmDelete(room.id)}
                          disabled={deletingId === room.id}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md flex items-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Видалити кімнату"
                        >
                          {deletingId === room.id ? "Видаляємо..." : <><FaTrash /> Видалити</>}
                        </button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
