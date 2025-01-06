"use client"

import { IProduct } from "@/interfaces/IProduct"
import { useState, createContext, useEffect, useContext } from "react"

interface CartContextType{
    items: IProduct[],
    addItemsToCart: (item: IProduct) => void,
    removeItemFromCart: (id: number) => void,
    emptyCart: () => void,
    countItems: (id: number) => number
}

const CartContext = createContext<CartContextType>({
    items: [],
    addItemsToCart: (item: IProduct) => {},
    removeItemFromCart: (id: number) => {},
    emptyCart: () => {},
    countItems: (id: number) => 0,
})

export function CartProvider ({children}: {children: React.ReactNode}) {
    const [items, setItems] = useState<IProduct[]>([])

    useEffect(() => {
        const savedItems = localStorage.getItem("cart");
        if (savedItems) {
            return setItems(JSON.parse(savedItems));
        }
        setItems([])
    }, []);

    const addItemsToCart = (item: IProduct) => {
        setItems([...items, item])
        localStorage.setItem("cart", JSON.stringify([...items, item]))
    }

    const removeItemFromCart = (id: number) => {
        const filtered = items.filter((e) => e.id != id)
        setItems(filtered)
        localStorage.setItem("cart",JSON.stringify(filtered))
    }

    const emptyCart = () => {
        setItems([])
        localStorage.removeItem("cart")
    }

    const countItems = (id: number) => {
        return items.filter((e) => e.id == id).length
    }

    const value = {
        items,
        addItemsToCart,
        removeItemFromCart,
        emptyCart,
        countItems
    }


    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
    const context = useContext(CartContext)
    return context 
}