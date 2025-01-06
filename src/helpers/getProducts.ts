import { IProduct } from "@/interfaces/IProduct";
import axios from "axios";

export const getProducts = async (): Promise<IProduct[]> => {
    const { data } =  await axios.get(`${process.env.API_URL}/products`);
    return data;
};