export interface Booking {
  id: string;
  room: string;
  date: any;
  time: string;
  userId: string;
}

export interface Room {
  id: string;
  name: string;
  description: string;
}