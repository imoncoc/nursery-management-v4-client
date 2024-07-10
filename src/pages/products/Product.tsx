import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../redux/api/api";
import { TProduct } from "./Product.interface";
import ProductCard from "./ProductCard";
import { Pagination, Select } from "antd";
import type { PaginationProps } from "antd";
import { AutoComplete, Input } from "antd";

const Product = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: products,
    isSuccess: isProductSuccess,
    isLoading,
    isFetching,
  } = useGetProductsQuery({
    page,
    limit,
    searchTerm,
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

  const filterOptions = [
    { value: "1", label: "Search item" },
    { value: "2", label: "Filter Item" },
    { value: "3", label: "Sort Item" },
  ];

  // console.log("product: ", products?.data);
  // console.log("isSuccess: ", isProductSuccess);
  // console.log("isLoading: ", isLoading);
  // console.log("isFetching: ", isFetching);

  // console.log("page: ", page);
  // console.log("limit: ", limit);
  // console.log("total: ", total);
  // console.log("totalPage: ", totalPage);

  const handleSearch = (value: string) => {
    // setOptions(value ? searchResult(value) : []);
    console.log("Search Value: ", value);
    setSearchTerm(value);
  };

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

      {/* SearchBar and Filter */}
      <div className="my-8 flex justify-end gap-4">
        <Select
          style={{ height: "40px", width: "250px" }}
          showSearch
          placeholder="Search, Filter or Sort"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={filterOptions}
        />
        <AutoComplete
          popupMatchSelectWidth={252}
          style={{ width: 300 }}
          // onSelect={onSelect}
          // onSearch={(text) => setAnotherOptions(getPanelValue(text))}
          // onChange={onChange}

          size="large"
        >
          <Input.Search
            size="large"
            onSearch={handleSearch}
            placeholder="Search Here"
            enterButton
          />
        </AutoComplete>
      </div>
      <div className="mt-12 flex justify-center border">
        <div className="grid md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  gap-x-4 lg:gap-x-8 gap-y-8 ">
          {isProductSuccess &&
            products?.data?.result.length > 0 &&
            products?.data?.result.map((item: TProduct) => (
              <ProductCard key={item._id} item={item} />
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
