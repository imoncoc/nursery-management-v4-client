import { useGetProductsQuery } from "../../redux/api/api";

const Product = () => {
  const { data: products, isLoading } = useGetProductsQuery({});
  console.log("product: ", products?.data?.result);
  return (
    <div className="container flex flex-col mx-auto p-6 lg:flex-row lg:mb-0">
      <div className="container mx-auto mt-16 px-6">
        <h2 className="mb-6 text-4xl font-semibold text-center uppercase">
          Products
        </h2>
        <p className="max-w-md mx-auto text-center text-grayishBlue">
          Explore our diverse range of high-quality trees, shrubs, and plants,
          perfect for enhancing any garden or landscape.
        </p>
      </div>
    </div>
  );
};

export default Product;
