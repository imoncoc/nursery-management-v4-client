import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../redux/api/api";
import { TProduct } from "./Product.interface";
import ProductCard from "./ProductCard";
import { InputNumber, Pagination, Select } from "antd";
import type { PaginationProps } from "antd";
import { AutoComplete, Input } from "antd";
// import { filterItemOptions } from "./Product.utils";
import useDebounce from "../hooks/useDebounce.ts";

const Product = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [searchItem, setSearchItem] = useState(false);
  const [filterItem, setFilterItem] = useState(false);
  const [filterObject, setFilterObject] = useState({
    name: "",
    value: "",
  });
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 1000ms debounce
  const debouncedFilterObject = useDebounce(filterObject, 500);
  const {
    data: products,
    isSuccess: isProductSuccess,
    isLoading,
    isFetching,
  } = useGetProductsQuery({
    page,
    limit,
    sortBy,
    searchTerm: debouncedSearchTerm,
    filterObject: debouncedFilterObject,
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
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!products?.data) {
    return <div>No posts :</div>;
  }

  const handleSortChange = (value: number) => {
    setSearchItem(false);
    setFilterItem(false);

    if (value === 7) {
      setSortBy("-price");
    } else if (value === 6) {
      setSortBy("price");
    } else if (value === 5) {
      setSortBy("-name");
    } else if (value === 4) {
      setSortBy("name");
    } else if (value === 3) {
      setSortBy("-rating");
    } else if (value === 2) {
      setSortBy("rating");
    } else if (value === 1) {
      setSearchItem(true);
    } else if (value === 0) {
      setFilterItem(true);
    }
    // setSortBy(value);
  };

  const filterOptions = [
    { value: 0, label: "Filter Items" },
    { value: 1, label: "Search items" },
    { value: 2, label: "Sort by rating ascending" },
    { value: 3, label: "Sort by rating descending" },
    { value: 4, label: "Sort by name ascending" },
    { value: 5, label: "Sort by name descending" },
    { value: 6, label: "Sort by price low to high" },
    { value: 7, label: "Sort by price high to low" },
  ];

  const filterItemOptions = [
    { value: 0, label: "Name" },
    { value: 1, label: "Category Name" },
    { value: 2, label: "Price" },
    { value: 3, label: "Rating" },
  ];

  const handleSearch = (value: string) => {
    // setOptions(value ? searchResult(value) : []);
    console.log("Search Value: ", value);
    setSearchTerm(value);
  };

  const handleFilterItem = (value: any) => {
    if (filterObject?.name?.length > 0) {
      if (filterObject?.name === "price" || filterObject?.name === "rating") {
        setFilterObject({
          ...filterObject,
          value: value,
        });
      } else {
        setFilterObject({
          ...filterObject,
          value: value,
        });
      }
    }
  };

  const handleFilterItemChange = (value: number) => {
    if (value === 0) {
      setFilterObject({
        ...filterObject,
        name: "name",
      });
    } else if (value === 1) {
      setFilterObject({
        ...filterObject,
        name: "categoriesName",
      });
    } else if (value === 2) {
      setFilterObject({
        ...filterObject,
        name: "price",
      });
    } else if (value === 3) {
      setFilterObject({
        ...filterObject,
        name: "rating",
      });
    }
  };

  return (
    <div className="container  mx-auto p-6 lg:flex-row lg:mb-0">
      <div className=" mx-auto mt-4 px-6">
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
          placeholder="Search, Filter or Sort"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={filterOptions}
          onChange={handleSortChange}
        />
        {searchItem && (
          <AutoComplete
            popupMatchSelectWidth={252}
            style={{ width: 300 }}
            // onSelect={onSelect}
            // onSearch={(text) => setAnotherOptions(getPanelValue(text))}
            onChange={handleSearch}

            // size="large"
          >
            <Input.Search
              size="large"
              onSearch={handleSearch}
              placeholder="Search Here"
              enterButton
            />
          </AutoComplete>
        )}
        {filterItem && (
          <div className="flex flex-row  gap-4">
            <Select
              style={{ height: "40px", width: "250px" }}
              placeholder="Name, Category Name, Price, Rating"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={filterItemOptions}
              onChange={handleFilterItemChange}
            />

            {(filterObject?.name?.length > 0 &&
              filterObject?.name === "price") ||
            filterObject?.name === "rating" ? (
              <InputNumber
                size="large"
                onChange={handleFilterItem}
                placeholder={filterObject?.name}
                // enterButton
                min={1}
                max={filterObject?.name === "rating" ? 5 : 99999999}
              />
            ) : (
              <Input.Search
                size="large"
                onSearch={handleFilterItem}
                placeholder="Filter Here"
                enterButton
              />
            )}
          </div>
        )}
      </div>
      <div className="mt-12 flex justify-center">
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
