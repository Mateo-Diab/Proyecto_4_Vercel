"use client"

import { useAuth } from "@/contexts/AuthContext"

export default function Private({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth()

    if(isAuthenticated) return children
}