"use client";

import { useAuth } from "@/contexts/AuthContext";
import { usePrivate } from "@/hooks/usePrivate";
import { IOrder } from "@/interfaces/IOrder";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Dashboard() {
  usePrivate();

  const { user, token } = useAuth();
  const [userOrders, setUserOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    if (token) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/users/orders`, {
          headers: {
            authorization: token,
          },
        })
        .then((response) => {
          setUserOrders(response.data);
        })
        .catch(() => {
          Swal.fire("Error getting orders");
        });
    }
  }, [token]);

  return (
    <div className="bg-gray-900 w-[80%] mx-auto p-6 rounded-lg shadow-lg space-y-6">

      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-white text-2xl font-semibold mb-4">User Information</h2>
        <p className="text-white">Name: {user?.name}</p>
        <p className="text-white">Email: {user?.email}</p>
        <p className="text-white">Phone: {user?.phone}</p>
        <p className="text-white">Address: {user?.address}</p>
      </div>

      <div className="bg-gray-700 p-4 rounded-lg shadow-md">
        <h2 className="text-white text-2xl font-semibold mb-4">Your Orders</h2>
        {userOrders.length ? (
          <div className="text-white space-y-4">
            {userOrders.map((order: any, index) => (
              <div
                key={index}
                className="bg-gray-600 p-4 rounded-lg shadow-md space-y-3"
              >
                <h3 className="text-lg font-bold">Order ID: {order.id}</h3>
                <p>Status: <span className="text-green-400">{order.status}</span></p>
                <p>Date: <span className="text-gray-300">{order.date}</span></p>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Products:</h4>
                  {order.products.map((product: any, idx: number) => (
                    <div
                      key={idx}
                      className="bg-gray-500 p-2 rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">{product.name}</p>
                      </div>
                      <p className="text-green-400">${product.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-white">You do not have orders.</div>
        )}
      </div>
    </div>
  );
}
