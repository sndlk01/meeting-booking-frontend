export default function RoomCard({ room, onBook }) {
    // Status indicator color
    const statusColor = room.is_active ? 'bg-emerald-500' : 'bg-red-500';

    return (
        <div className="group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            {/* Accent Gradient Top */}
            <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {room.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {room.location}
                        </div>
                    </div>
                    <span className={`h-2.5 w-2.5 rounded-full ${statusColor} shadow-lg shadow-${statusColor}/50`} />
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 mb-6 line-clamp-2 text-sm">
                    {room.description || "No description available."}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span>Cap: {room.capacity}</span>
                    </div>

                    <button
                        onClick={() => onBook(room)}
                        disabled={!room.is_active}
                        className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-semibold rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors shadow-lg shadow-zinc-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
}
