# Meeting Room Booking System

A modern, responsive web application for booking meeting rooms, built with [Next.js](https://nextjs.org) and styled with [Tailwind CSS](https://tailwindcss.com).

## Features

- **👀 View Rooms**: Browse available meeting rooms with details like capacity, location, and description.
- **📅 Check Availability**: Filter rooms by availability status.
- **✨ Book a Room**: Seamless booking experience with instant confirmation.
- **➕ Create Rooms**: Admin capability to add new meeting rooms to the system.
- **🌓 Dark Mode**: Fully supported dark mode for better visual comfort.

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS v4
- **Runtime**: Bun (Recommended) or Node.js
- **API**: Connects to a backend service (default: `localhost:8081`)

## Prerequisites

Before running the application, ensure you have:

1.  **Bun** installed (or Node.js).
2.  The **Backend API** running at `http://localhost:8081`.

## Getting Started

1.  **Install dependencies**:
    ```bash
    bun install
    ```

2.  **Run the development server**:
    ```bash
    bun run dev
    ```

3.  **Open the application**:
    Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app`: Main application pages and layout.
- `src/components`: Reusable UI components (RoomCard, BookingModal, etc.).
- `src/services`: API integration services.
- `docs`: Project documentation and API specifications.

## Configuration

The application is configured to proxy API requests to `http://localhost:8081` to avoid CORS issues. This is defined in `next.config.mjs`.

If your backend is running on a different port/host, update the rewrite rule in `next.config.mjs`.
