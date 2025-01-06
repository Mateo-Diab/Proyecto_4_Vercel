"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-col items-center justify-center space-y-8 p-5">

      <h1 className="text-6xl font-extrabold text-white animate__animated animate__fadeIn animate__delay-1s">
        Welcome to Our Store!
      </h1>

      <p className="text-xl text-gray-300 text-center animate__animated animate__fadeIn animate__delay-2s">
        Discover the best deals and explore a new world of shopping. We offer premium products just for you.
      </p>

      <div className="flex justify-center gap-6 mt-6">
        <Link href="/home">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:bg-blue-500">
            Shop Now
          </button>
        </Link>
      </div>

    </div>
  );
}
