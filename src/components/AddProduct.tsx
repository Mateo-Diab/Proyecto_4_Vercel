"use client"

import Swal from "sweetalert2";
import { useCart } from "@/contexts/CartContext";
import { IProduct } from "@/interfaces/IProduct";
import { useEffect, useState } from "react";
import { Toast } from "./toast";

export default function AddProduct({ product }: { product: IProduct }) {
    const { addItemsToCart, items, countItems } = useCart();
    const [disabled, setDisabled] = useState<boolean>(false)

    const addProductHandler = () => {
            Swal.fire({
              title: "Are you sure you want to add this to the cart?",
              text: "This product will be added to the cart",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes, add to the cart!",
              cancelButtonText: "No, do not add to the cart!",
            }).then((result) => {
              if (result.isConfirmed) {
                addItemsToCart(product)
                Toast.fire({
                    title: "Product added",
                    text: "Added to the cart",
                    icon: "success"
                  })
              }
            });
    };

    useEffect(()=> {
        //countItems(product.id) >= product.stock ? setDisabled(true) : setDisabled(false) 
        countItems(product.id) >= 1 ? setDisabled(true) : setDisabled(false)
    }, [items])

    return (
        <button
            className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:bg-blue-500 ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
            onClick={addProductHandler}
            disabled={disabled}
        >
            Add Product to Cart
        </button>
    );
}
