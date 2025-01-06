import { getProducts } from "./getProducts";

export default async function (id: number) {
    const products = await getProducts();
    const product = products.find(p => p.id === id)
    if(!product) throw Error("Product does not exist")
    return product
}