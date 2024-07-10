import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../redux/api/api";
import { Button, Table } from "antd";
import type { TableColumnsType } from "antd";
import { TProduct } from "../products/Product.interface";
import type { GetProp, TableProps } from "antd";
import { useNavigate } from "react-router-dom";

type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

interface TableParams {
  pagination?: TablePaginationConfig;
  //   sortField?: SorterResult<any>["field"];
  //   sortOrder?: SorterResult<any>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

const ProductAndCategoryManagementTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const {
    data: products,
    isSuccess: isProductSuccess,
    isLoading,
    isFetching,
  } = useGetProductsQuery({
    page,
    limit,
  });

  console.log("product: ", products?.data);
  console.log("isSuccess: ", isProductSuccess);
  console.log("isLoading: ", isLoading);
  console.log("isFetching: ", isFetching);

  console.log("page: ", page);
  console.log("limit: ", limit);
  console.log("total: ", total);

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: page,
      pageSize: limit,
      total: total,
    },
  });

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPage(pagination.current as number);
    setLimit(pagination.pageSize as number);

    setTableParams((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    }));
  };

  useEffect(() => {
    if (!isFetching && products) {
      setTotal(products?.data?.meta?.total);
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: products?.data?.meta?.total,
        },
      }));
    }
  }, [isFetching, products]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!products?.data) {
    return <div>No posts :</div>;
  }

  const columns: TableColumnsType<TProduct & { index: number }> = [
    {
      title: "No.",
      dataIndex: "index",
      width: 80,
    },
    {
      title: "Image",
      dataIndex: "thumbnail",
      width: 120,
      render: (text: string) => (
        <img
          src={text}
          alt="product"
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "name",
      width: 220,
    },
    {
      title: "Category Name",
      dataIndex: "categoriesName",
      width: 120,
    },
    {
      title: "Price",
      dataIndex: "price",
      width: 120,
      render: (price: number) => <span>${price}</span>,
    },
    {
      title: "Action",
      align: "center",
      width: 220,
      render: (_, key) => (
        <div className="flex gap-2">
          <Button onClick={() => handleViewDetails(key?._id)}>
            View Details
          </Button>
          <Button type="primary">Update</Button>
          <Button type="primary" danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleViewDetails = (id: string) => {
    navigate(`/product/${id}`);
  };

  const dataSource = products?.data?.result?.map(
    (product: TProduct, index: number) => ({
      ...product,
      key: product._id, // Assigning key to each row
      index: (page - 1) * limit + index + 1, // Calculate the correct index based on pagination
    })
  );

  console.log("ProductAndCategoryManagementTable data: ", products);
  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex justify-end">
          <button className="custom-button-secondary">Add new item</button>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{
            ...tableParams.pagination,
            showSizeChanger: true,
          }}
          onChange={handleTableChange}
          scroll={{ y: 1000 }}
        />
      </div>
    </div>
  );
};

export default ProductAndCategoryManagementTable;
