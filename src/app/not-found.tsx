"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-6 text-gray-400">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        href="/home"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
      >
        Go Back Home
      </Link>
    </div>
  );
}