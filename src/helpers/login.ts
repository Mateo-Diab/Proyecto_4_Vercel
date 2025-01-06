"use client"

import { ILogin } from "@/interfaces/ILogin";
import axios from "axios";

export default async function singup(loginForm: ILogin) {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, loginForm)
    console.log(response.data);
}