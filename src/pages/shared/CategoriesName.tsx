import { useGetAllProductCategoriesNameQuery } from "../../redux/api/api";

type TCategoriesName = {
  categoriesName: string;
  thumbnail: string;
};

const CategoriesName = () => {
  const { data, isLoading } = useGetAllProductCategoriesNameQuery({});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <div className=" mx-auto mt-4 px-6">
        <h2 className="mb-6 text-4xl font-semibold text-center uppercase">
          Top Categories
        </h2>
        <p className="max-w-md mx-auto text-center text-grayishBlue">
          Explore our diverse range of high-quality trees, shrubs, and plants,
          perfect for enhancing any garden or landscape.
        </p>
      </div>

      <div className="flex flex-row gap-6 my-10 flex-wrap justify-center items-center">
        {data?.data.map((item: TCategoriesName) => (
          <div key={item?.categoriesName}>
            <img
              className="size-28 md:size-40 rounded-full transition-all duration-300 hover:shadow-md"
              src={item?.thumbnail}
            ></img>
            <p className="text-center my-2 text-lime-600 font-semibold text-sm md:text-lg">
              {item?.categoriesName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesName;
