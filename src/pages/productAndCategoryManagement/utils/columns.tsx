// columns.tsx

import { Button, Popconfirm } from "antd";
import type { TableColumnsType } from "antd";
import { TProduct } from "../../products/Product.interface";

type ColumnProps = {
  handleViewDetails: (id: string) => void;
  handleUpdateItem: (product: TProduct) => void;
  onHandleDeleteProduct: (id: string) => void;
};

export const getColumns = ({
  handleViewDetails,
  handleUpdateItem,
  onHandleDeleteProduct,
}: ColumnProps): TableColumnsType<TProduct & { index: number }> => [
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
      <img src={text} alt="product" style={{ width: "50px", height: "50px" }} />
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
    title: "Stock",
    dataIndex: "stock",
    width: 60,
    render: (stock: number) => <span>{stock}</span>,
  },
  {
    title: "Price",
    dataIndex: "price",
    width: 80,
    render: (price: number) => <span>${price}</span>,
  },

  {
    title: "Action",
    align: "center",
    width: 220,
    render: (_, product) => (
      <div className="flex gap-2">
        <Button onClick={() => handleViewDetails(product._id as string)}>
          View Details
        </Button>
        <Button type="primary" onClick={() => handleUpdateItem(product)}>
          Update
        </Button>
        <Popconfirm
          title="Are you sure you want to delete this item?"
          onConfirm={() => onHandleDeleteProduct(product._id as string)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
      </div>
    ),
  },
];
