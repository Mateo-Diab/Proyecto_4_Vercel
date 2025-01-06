import AddProduct from "@/components/AddProduct";
import getProduct from "@/helpers/getProduct";
import { IProduct } from "@/interfaces/IProduct";
import Image from "next/image";

export default async function Product({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product: IProduct = await getProduct(Number(slug));
    const { name, price, description, image } = product;

    return (
        <div className="flex flex-col m-5 items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="bg-gray-800 shadow-xl rounded-lg p-8 w-full max-w-3xl">
                <h1 className="text-4xl font-semibold text-gray-100 mb-4">{name}</h1>
                <div className="flex items-center gap-x-2">
                    <h2>Price:</h2>
                    <h3 className="text-green-600">${price}</h3>
                </div>
                <p className="text-gray-300 mb-6">{description}</p>
                <Image src={image} width={500} height={500} alt="product" className="object-contain rounded mb-3" />
                <AddProduct product={product} />
            </div>
        </div>
    );
}
