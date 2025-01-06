"use client";

import { useCart } from "@/contexts/CartContext";

export default function CartStatus() {
  const { items } = useCart();

  return (
    <div className="flex items-center gap-2 text-white bg-gray-800 p-2 rounded-lg shadow-md">
      <span className="text-lg font-semibold">Products:</span>
      <span className="text-xl font-bold text-blue-500">{items.length}</span>
    </div>
  );
}
