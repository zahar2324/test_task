import { create } from "zustand";
import { db } from "@/services/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Room {
  id: string;
  name: string;
  description: string;
}

interface RoomsState {
  rooms: Room[];
  fetchRooms: () => Promise<void>;
  addRoom: (room: Room) => void;
}

export const useRoomsStore = create<RoomsState>((set) => ({
  rooms: [],
  fetchRooms: async () => {
    const querySnapshot = await getDocs(collection(db, "rooms"));
    const roomList: Room[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Room[];
    set({ rooms: roomList });
  },
  addRoom: (room) => set((state) => ({ rooms: [room, ...state.rooms] })),
}));