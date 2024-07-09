import { useGetProductsQuery } from "../../redux/api/api";
import { TProduct } from "./Product.interface";
import ProductCard from "./ProductCard";

const Product = () => {
  const {
    data: products,
    isSuccess: isProductSuccess,
    isLoading,
  } = useGetProductsQuery({});
  console.log("product: ", products?.data?.result?.length);
  console.log("isSuccess: ", isProductSuccess);
  console.log("isLoading: ", isLoading);
  return (
    <div className="container  mx-auto p-6 lg:flex-row lg:mb-0">
      <div className="container mx-auto mt-4 px-6">
        <h2 className="mb-6 text-4xl font-semibold text-center uppercase">
          Products
        </h2>
        <p className="max-w-md mx-auto text-center text-grayishBlue">
          Explore our diverse range of high-quality trees, shrubs, and plants,
          perfect for enhancing any garden or landscape.
        </p>
      </div>

      <div className="mt-12 flex justify-center">
        <div className="grid md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 ">
          {isProductSuccess &&
            products?.data?.result.length > 0 &&
            products?.data?.result.map((item: TProduct) => (
              <ProductCard item={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
