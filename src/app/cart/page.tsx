"use client";

import { Toast } from "@/components/toast";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { IProduct } from "@/interfaces/IProduct";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface ICartProduct extends IProduct {
  quantity: number;
}

export default function Cart() {

  const { items, emptyCart, removeItemFromCart } = useCart();
  const { user, token } = useAuth();    
  const router = useRouter() 

  const groupedItems: ICartProduct[] = [];

  const handleEmptyCart = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove all items from your cart.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, empty it!",
      cancelButtonText: "No, keep them",
    }).then((result) => {
      if (result.isConfirmed) {
        emptyCart();
        Swal.fire("Empty!", "Your cart has been emptied.", "success");
      }
    });
  };

  const removeItemHandler = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will this items from your cart.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        removeItemFromCart(Number(id));
        Toast.fire("Removed!", "The item has been removed from your cart.", "success");}
    });
  };

  const checkOutHandler = () => {
    if(user) {
      Swal.fire({
        title: "Are you sure you want to proceed?",
        text: "Your cart will be cleared after the purchase.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, proceed with checkout!",
        cancelButtonText: "No, keep my items",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
              userid: user?.id,
              products: items.map((e) => e.id) 
          },{
              headers:{
                  authorization: token
              }
          })
          .then((response) => {
              Swal.fire("Success!", "Your cart has been cleared and the order is processed.", "success");
              emptyCart();
              router.push("/dashboard")
          })
          .catch((error) => {console.log(error);
              Swal.fire("Warning!", "Error procesing order.", "warning");
          })
        }
      });
    } else {
      Swal.fire("Login before checkout!","", "warning");
    }
  };
  

  items.forEach((item) => {
    const index = groupedItems.findIndex((i: ICartProduct) => i.id === item.id);
    if (index !== -1) {
      groupedItems[index].quantity++;
    } else {
      groupedItems.push({ ...item, quantity: 1 });
    }
  });

  let totalPrice = 0;

  for (let i = 0; i < groupedItems.length; i++) {
    totalPrice += groupedItems[i].price * groupedItems[i].quantity;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-5">
      <h1 className="text-4xl font-bold mb-6">Cart</h1>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md space-y-6">
        {groupedItems.length ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Items</h2>
              <button
                onClick={handleEmptyCart}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Empty Cart
              </button>
            </div>
            <div className="space-y-4">
              {groupedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-gray-700 p-3 rounded"
                >
                  <div>
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-green-400">${item.price}</p>
                    <button
                      onClick={() => removeItemHandler(String(item.id))}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-6">
              <p className="text-xl font-semibold">Total:</p>
              <p className="text-2xl font-bold text-green-400">${totalPrice}</p>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={checkOutHandler}
                
                className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform`}
              >
                Checkout
              </button>
            </div>
          </>
        ) : (
          <h2 className="text-center text-gray-400">Your cart is empty.</h2>
        )}
      </div>
    </div>
  );
}
