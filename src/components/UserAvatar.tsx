"use client";

import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import Swal from "sweetalert2";

export default function UserAvatar() {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout(); 
        Swal.fire("Logged out", "You have been logged out.", "success");
      }
    });
  };

  return (
    <div className="flex items-center gap-4">
      {isAuthenticated ? (
        <div className="flex items-center gap-4">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
            width={60}
            height={60}
            alt="user avatar"
            className="rounded-full border-2 border-gray-500 p-1"
          />
          <div className="flex flex-col">
            <p className="text-white font-semibold">Hi, {user?.name}!</p>
            <button
              onClick={handleLogout}
              className="mt-2 bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-lg transition-all duration-300 ease-in-out"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link href="/auth/login">
            <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-all duration-300 ease-in-out">
              Login
            </button>
          </Link>
          <Link href="/auth/signUp">
            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-all duration-300 ease-in-out">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
