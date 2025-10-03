"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/services/firebase";
import BookedRooms from "@/components/BookedRooms";
import GetBookedRooms from "@/components/GetBookRooms";

export default function BookedRoomsPage() {
  const [user] = useAuthState(auth);

  if (!user) {
    return <div className="p-10 text-center text-purple-600">Увійдіть, щоб переглянути свої бронювання.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-purple-700 text-center mt-10 mb-6">Профіль</h1>
      <GetBookedRooms userId={user?.uid} />
    </div>
  );
}