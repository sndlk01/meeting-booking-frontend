const BASE_URL = '/api/v1';

const headers = {
    'Content-Type': 'application/json',
};

async function handleResponse(response) {
    if (!response.ok) {
        const errorText = await response.text();
        let errorMessage;

        try {
            const errorJson = JSON.parse(errorText);
            errorMessage = errorJson.message || errorJson.detail || errorJson.error;
        } catch (e) {
            // If parsing fails, use the raw text
            errorMessage = errorText;
        }

        throw new Error(errorMessage || `HTTP error! status: ${response.status}`);
    }
    return response.json();
}

function buildUrl(endpoint, params = {}) {
    // Manually construct URL to support relative paths
    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_URL}${endpoint}`;
    return queryString ? `${url}?${queryString}` : url;
}

export const api = {
    // --- Rooms ---
    getRooms: async (params = {}) => {
        const response = await fetch(buildUrl('/rooms/', params), { method: 'GET', headers });
        return handleResponse(response);
    },

    createRoom: async (data) => {
        const response = await fetch(`${BASE_URL}/rooms/`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    getRoom: async (id) => {
        const response = await fetch(`${BASE_URL}/rooms/${id}`, { method: 'GET', headers });
        return handleResponse(response);
    },

    updateRoom: async (id, data) => {
        const response = await fetch(`${BASE_URL}/rooms/${id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    deleteRoom: async (id) => {
        const response = await fetch(`${BASE_URL}/rooms/${id}`, { method: 'DELETE', headers });
        if (response.status === 204) return true;
        return handleResponse(response);
    },

    checkAvailability: async (id, startDatetime, endDatetime) => {
        const response = await fetch(
            buildUrl(`/rooms/${id}/availability`, { start_datetime: startDatetime, end_datetime: endDatetime }),
            { method: 'GET', headers }
        );
        return handleResponse(response);
    },

    findAvailableRooms: async (params) => {
        const response = await fetch(buildUrl('/rooms/available/', params), { method: 'GET', headers });
        return handleResponse(response);
    },

    getRoomSchedule: async (id, targetDate) => {
        const response = await fetch(
            buildUrl(`/rooms/${id}/schedule`, { target_date: targetDate }),
            { method: 'GET', headers }
        );
        return handleResponse(response);
    },

    // --- Bookings ---
    getBookings: async (params = {}) => {
        const response = await fetch(buildUrl('/bookings/', params), { method: 'GET', headers });
        return handleResponse(response);
    },

    createBooking: async (data) => {
        const response = await fetch(`${BASE_URL}/bookings/`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    getBooking: async (id) => {
        const response = await fetch(`${BASE_URL}/bookings/${id}`, { method: 'GET', headers });
        return handleResponse(response);
    },

    updateBooking: async (id, data) => {
        const response = await fetch(`${BASE_URL}/bookings/${id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    cancelBooking: async (id, reason) => {
        const response = await fetch(
            buildUrl(`/bookings/${id}`, { reason }),
            { method: 'DELETE', headers }
        );
        return handleResponse(response);
    },

    getUpcomingBookings: async (days = 7) => {
        const response = await fetch(buildUrl('/bookings/upcoming/', { days }), { method: 'GET', headers });
        return handleResponse(response);
    },

    getTodayBookings: async () => {
        const response = await fetch(`${BASE_URL}/bookings/today/`, { method: 'GET', headers });
        return handleResponse(response);
    },

    getMyBookings: async (email) => {
        const response = await fetch(buildUrl('/bookings/my/', { organizer_email: email }), { method: 'GET', headers });
        return handleResponse(response);
    },

    searchBookings: async (query) => {
        const response = await fetch(buildUrl('/bookings/search/', { q: query }), { method: 'GET', headers });
        return handleResponse(response);
    }
};
