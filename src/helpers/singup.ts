"use client"

import { IRegister } from "@/interfaces/IRegister";
import axios from "axios";

export default async function singup(signUpForm: IRegister) {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, signUpForm)
}