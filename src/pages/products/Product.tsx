import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../redux/api/api";
import { TProduct } from "./Product.interface";
import ProductCard from "./ProductCard";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";

const Product = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const {
    data: products,
    isSuccess: isProductSuccess,
    isLoading,
    isFetching,
  } = useGetProductsQuery({
    page,
    limit,
  });

  useEffect(() => {
    if (!isFetching && products) {
      setTotal(products?.data?.meta?.total);
      setTotalPage(products?.data?.meta?.totalPage);
    }
  }, [isFetching]);

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    setPage(current);
    setLimit(pageSize);
    console.log("inside onShowSizeChange:", current, pageSize);
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!products?.data) {
    return <div>No posts :</div>;
  }

  console.log("product: ", products?.data);
  console.log("isSuccess: ", isProductSuccess);
  console.log("isLoading: ", isLoading);
  console.log("isFetching: ", isFetching);

  console.log("page: ", page);
  console.log("limit: ", limit);
  console.log("total: ", total);
  console.log("totalPage: ", totalPage);

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
      <div className="my-8 flex justify-end">
        <Pagination
          showSizeChanger
          defaultCurrent={page}
          total={total}
          onChange={(p, pageSize) => {
            setPage(p);
            setLimit(pageSize);
          }}
          onShowSizeChange={onShowSizeChange}
        />
      </div>
    </div>
  );
};

export default Product;
