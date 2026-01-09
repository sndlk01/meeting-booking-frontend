"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import RoomCard from "@/components/RoomCard";
import BookingModal from "@/components/BookingModal";
import CreateRoomModal from "@/components/CreateRoomModal";

export default function Home() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [filter, setFilter] = useState("all");

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const fetchedRooms = await api.getRooms({ active_only: true, limit: 100 });
      const roomList = Array.isArray(fetchedRooms) ? fetchedRooms : (fetchedRooms.items || []);
      setRooms(roomList);
    } catch (error) {
      console.error("Failed to fetch rooms", error);
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
              M
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400">
              MeetingRoom
            </span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <a href="#" className="text-zinc-900 dark:text-white hover:text-indigo-600 transition-colors">Dashboard</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">My Bookings</a>
            <button
              onClick={() => setIsCreatingRoom(true)}
              className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
            >
              + Add Room
            </button>
          </nav>
          <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6">
            Find your perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">workspace</span>
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Book meeting rooms instantly. Simple, fast, and designed for your productivity.
          </p>
        </div>

        {/* Filters & Actions */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Available Rooms</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setIsCreatingRoom(true)}
              className="md:hidden px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-all"
            >
              + Add Room
            </button>
            <div className="flex gap-2 bg-white dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${filter === 'all' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-700'}`}
              >
                All Rooms
              </button>
              <button
                onClick={() => setFilter("available")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${filter === 'available' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-700'}`}
              >
                Available Now
              </button>
            </div>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onBook={(r) => setSelectedRoom(r)}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-400">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <p className="text-zinc-900 dark:text-white font-medium mb-1">No rooms found</p>
                <p className="text-zinc-500 text-sm mb-4">Get started by creating your first meeting room.</p>
                <button
                  onClick={() => setIsCreatingRoom(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
                >
                  Create a Room
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedRoom && (
        <BookingModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
          onSuccess={() => {
            alert("Booking created successfully!");
            // Optionally refresh room data
          }}
        />
      )}

      {/* Create Room Modal */}
      {isCreatingRoom && (
        <CreateRoomModal
          onClose={() => setIsCreatingRoom(false)}
          onSuccess={() => {
            fetchRooms();
            alert("Room created successfully!");
          }}
        />
      )}
    </div>
  );
}
