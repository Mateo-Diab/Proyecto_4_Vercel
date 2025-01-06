import { ICardProps } from "@/interfaces/ICardProps";
import Image from "next/image";
import Link from "next/link";

export default function Card({name, image, price, description, id}: ICardProps) {
    return (
        
            <div className="bg-gray-800 shadow-xl rounded-lg p-8 w-full max-w-3xl space-y-4">
                <h3>{name}</h3>
                <Image src={image} width={1920} height={1080} alt="" className="w-[90%] md:w-[60%]"/>
                <p>{description}</p>
                <div className="flex items-center gap-x-2">
                    <h2>Price:</h2>
                    <h3 className="text-green-600">${price}</h3>
                </div>
                <Link href={`product/${id}`}>
                    <button 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:bg-blue-500 mt-3">
                                See Product
                    </button>
                </Link>
            </div>
    )
}