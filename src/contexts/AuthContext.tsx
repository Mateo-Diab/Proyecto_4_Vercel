"use client"

import { IUser } from "@/interfaces/IUser"
import axios from "axios"
import { useRouter } from "next/navigation"
import { createContext, use, useContext, useEffect, useState } from "react"

interface IAuthContext{
    user: IUser | null,
    login: (form: any) => void,
    logout: () => void,
    isAuthenticated: boolean,
    token: string | null
}

const AuthContext = createContext<IAuthContext>({
    user: null,
    login: (form: any) => {},
    logout: () => {},
    isAuthenticated: false,
    token: null
})

export const AuthProvider = ({children}: {children: React.ReactNode}) => {

    const [user, setUser] = useState<IUser | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [token, setToken] = useState<string | null>(null);

    const router = useRouter()

    useEffect(() => {
        const user = localStorage.getItem("user")
        const token = localStorage.getItem("token")

        if(user && token){
            setUser(JSON.parse(user))
            setIsAuthenticated(true)
            setToken(token)
        }else{
            setUser(null)
            setIsAuthenticated(false)
            setToken(null)
        }
    }, [])

    const login = async (form: any) => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, form)

        localStorage.setItem("user", JSON.stringify(response.data.user))
        localStorage.setItem("token", response.data.token)

        setToken(response.data.token)
        setUser(response.data.user)
        setIsAuthenticated(true)
        router.push("/home")
    }

    const logout = async () => {
        setUser(null)
        setIsAuthenticated(false)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        router.replace("/home")
    }


    const value = {
        user,
        login,
        token,
        logout,
        isAuthenticated,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};