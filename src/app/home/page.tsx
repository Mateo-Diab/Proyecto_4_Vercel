import Card from "@/components/card";
import { getProducts } from "@/helpers/getProducts";
import { IProduct } from "@/interfaces/IProduct";

export default async function Home() {
  let products: IProduct[] = [];

  try {
    products = await getProducts();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred");
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-gray-100 mb-8">Our Products</h1>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl">
        {products.length > 0 ? (
          products.map(({ name, image, description, id, price }) => (
            <Card
              key={id}
              id={id}
              name={name}
              image={image}
              description={description}
              price={price}
            />
          ))
        ) : (
          <div className="flex items-center justify-center col-span-full h-screen text-center text-5xl font-extrabold text-gray-500">
            No products available
          </div>
        )}
      </div>
    </div>
  );
}
