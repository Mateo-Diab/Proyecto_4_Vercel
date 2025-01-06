"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export const usePrivate = () => {
    
    const { isAuthenticated } = useAuth()
    const router = useRouter()

    useEffect(() => {
        !isAuthenticated && router.push("/home")
    }, [])
}