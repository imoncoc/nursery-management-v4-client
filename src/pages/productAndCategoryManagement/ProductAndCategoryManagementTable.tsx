import { useEffect, useState } from "react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
  usePostNewProductMutation,
  useUpdateProductMutation,
} from "../../redux/api/api";
import { Form, Input, Modal, Table, Checkbox, InputNumber, Rate } from "antd";
import type { FormProps } from "antd";
import { TProduct } from "../products/Product.interface";
import type { GetProp, TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; // Adjust the path accordingly
import { getColumns } from "./utils/columns";

type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

interface TableParams {
  pagination?: TablePaginationConfig;
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

type FieldType = TProduct;

const ProductAndCategoryManagementTable = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [currentProduct, setCurrentProduct] = useState<TProduct | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [updateProductToggle, setUpdateProductToggle] = useState(false);

  const {
    data: products,
    isLoading,
    isFetching,
  } = useGetProductsQuery({
    page,
    limit,
  });

  const [postNewProduct] = usePostNewProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const [deleteProduct] = useDeleteProductMutation();

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

  const handleViewDetails = (id: string) => {
    navigate(`/product/${id}`);
  };

  const onHandleDeleteProduct = (id: string) => {
    deleteProduct(id as string);
    toast.success("Successfully Deleted", { duration: 3000 });
  };

  // const handleAddNewItem = () => {
  //   setCurrentProduct(null);
  //   form.resetFields();
  //   setModalOpen(true);
  // };

  const handleAddNewItem = () => {
    setUpdateProductToggle(false);
    setCurrentProduct(null);
    form.resetFields();
    form.setFieldsValue({
      careInformation: {
        wateringRequirements:
          "Water regularly during the growing season; reduce watering in winter.",
        sunlightRequirements:
          "Full sun (at least 6 hours of direct sunlight per day).",
        soilType: "Well-draining, sandy or loamy soil.",
        fertilization:
          "Fertilize monthly during the growing season with a balanced fertilizer.",
        pruning:
          "Prune in late winter to shape and remove any dead or weak branches.",
        pestsAndDiseases:
          "Generally pest-resistant, but can be susceptible to scale insects and caterpillars. Regularly inspect and treat as needed.",
      },
      additionalInformation: {
        origin: "Native to Madagascar.",
        seasonality: "Blooms in late spring to early summer.",
        hardiness:
          "Sensitive to frost; requires protection in cooler climates.",
        toxicity: "Non-toxic to humans and pets.",
        uses: "Ideal for ornamental use, providing shade, and adding vibrant color to landscapes.",
      },
      physicalCharacteristics: {
        height: "10 feet",
        spread: "12 feet",
        growthRate: "Fast",
        matureHeight: "30-40 feet",
        matureSpread: "40-60 feet",
        plantingZone: "USDA hardiness zone 10-12",
      },
      availabilityStock: true,
      rating: 4.9,
    });
    setModalOpen(true);
  };

  const handleUpdateItem = (product: TProduct) => {
    setCurrentProduct(product);
    form.setFieldsValue(product);
    setModalOpen(true);
    setUpdateProductToggle(true);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const thumbnailUrl = values.thumbnail;
    let updatedValues;

    if (thumbnailUrl) {
      // Create an array with three instances of the thumbnail URL
      const imagesArray = [thumbnailUrl, thumbnailUrl, thumbnailUrl];

      // Update the form values to include the images array
      updatedValues = {
        ...values,
        images: imagesArray,
      };
    }

    if (updateProductToggle) {
      const currentId = currentProduct?._id;
      const options = { updatedValues, currentId };

      try {
        const { data } = await updateProduct(options);

        if (data) {
          toast.success("Successfully Update product!", { duration: 3000 });
        } else {
          toast.error("Failed to Update product. Please try again later.");
        }

        // Close the modal or perform any other necessary actions
        setModalOpen(false);
      } catch (error) {
        console.error("Error adding product:", error);
        toast.error(
          "An error occurred while adding product. Please try again later."
        );
      }
    }
    // const thumbnailUrl = values.thumbnail;

    // let updatedValues;

    // if (thumbnailUrl) {
    //   // Create an array with three instances of the thumbnail URL
    //   const imagesArray = [thumbnailUrl, thumbnailUrl, thumbnailUrl];

    //   // Update the form values to include the images array
    //   updatedValues = {
    //     ...values,
    //     images: imagesArray,
    //   };
    // }
    else {
      try {
        const { data } = await postNewProduct(updatedValues);

        if (data) {
          toast.success("Successfully added product!", { duration: 3000 });
        } else {
          toast.error("Failed to add product. Please try again later.");
        }

        // Close the modal or perform any other necessary actions
        setModalOpen(false);
      } catch (error) {
        console.error("Error adding product:", error);
        toast.error(
          "An error occurred while adding product. Please try again later."
        );
      }
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onFinish(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!products?.data) {
    return <div>No posts :</div>;
  }

  const dataSource = products?.data?.result?.map(
    (product: TProduct, index: number) => ({
      ...product,
      key: product._id,
      index: (page - 1) * limit + index + 1,
    })
  );

  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-col gap-6">
          <div className="flex justify-end">
            <button
              className="custom-button-secondary"
              onClick={handleAddNewItem}
            >
              Add new item
            </button>
          </div>
          <Table
            columns={getColumns({
              handleViewDetails,
              handleUpdateItem,
              onHandleDeleteProduct,
            })}
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

      <Modal
        title={currentProduct ? "Update Item" : "Add New Item"}
        centered
        open={modalOpen}
        // onOk={() => form.submit()}
        onOk={handleOk}
        okText="Submit"
        onCancel={() => setModalOpen(false)}
        width={1000}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ width: "100%" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<TProduct>
            label="Title"
            name="name"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<TProduct>
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item<TProduct>
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input the price!" }]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              marginRight: "16px",
            }}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item<TProduct>
            label="Stock"
            name="stock"
            rules={[
              { required: true, message: "Please input the stock quantity!" },
            ]}
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item<TProduct>
            label="Availability"
            name="availabilityStock"
            valuePropName="checked"
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              marginRight: "16px",
            }}
          >
            <Checkbox>Available</Checkbox>
          </Form.Item>
          {/* <Form.Item<TProduct>
            label="Rating"
            name="rating"
            rules={[{ required: true, message: "Please input the rating!" }]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
            }}
          >
            <InputNumber min={0} max={5} style={{ width: "100%" }} />
          </Form.Item> */}
          <Form.Item<TProduct>
            label="Rating"
            name="rating"
            rules={[{ required: true, message: "Please input the rating!" }]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
            }}
          >
            <Rate allowHalf />
          </Form.Item>
          <Form.Item<TProduct>
            label="Thumbnail URL"
            name="thumbnail"
            rules={[
              { required: true, message: "Please input the thumbnail URL!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<TProduct>
            label="Categories Name"
            name="categoriesName"
            rules={[
              { required: true, message: "Please input the category name!" },
            ]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item label="Images" name="images">
            <Input.TextArea placeholder="Enter image URLs separated by commas" />
          </Form.Item> */}

          <Form.Item
            label="Physical Characteristics"
            style={{ marginBottom: 0 }}
          >
            <Form.Item
              name={["physicalCharacteristics", "height"]}
              label="Height"
              rules={[{ required: true, message: "Please input the height!" }]}
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["physicalCharacteristics", "spread"]}
              label="Spread"
              rules={[{ required: true, message: "Please input the spread!" }]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                marginLeft: "16px",
              }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["physicalCharacteristics", "growthRate"]}
              label="Growth Rate"
              rules={[
                { required: true, message: "Please input the growth rate!" },
              ]}
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["physicalCharacteristics", "matureHeight"]}
              label="Mature Height"
              rules={[
                { required: true, message: "Please input the mature height!" },
              ]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                marginLeft: "16px",
              }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["physicalCharacteristics", "matureSpread"]}
              label="Mature Spread"
              rules={[
                { required: true, message: "Please input the mature spread!" },
              ]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                marginRight: "16px",
              }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["physicalCharacteristics", "plantingZone"]}
              label="Planting Zone"
              rules={[
                { required: true, message: "Please input the planting zone!" },
              ]}
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            >
              <Input />
            </Form.Item>
          </Form.Item>

          <Form.Item label="Care Information" style={{ marginBottom: 0 }}>
            <Form.Item
              name={["careInformation", "wateringRequirements"]}
              label="Watering Requirements"
              rules={[
                {
                  required: true,
                  message: "Please input the watering requirements!",
                },
              ]}
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["careInformation", "sunlightRequirements"]}
              label="Sunlight Requirements"
              rules={[
                {
                  required: true,
                  message: "Please input the sunlight requirements!",
                },
              ]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                marginLeft: "16px",
              }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["careInformation", "soilType"]}
              label="Soil Type"
              rules={[
                { required: true, message: "Please input the soil type!" },
              ]}
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["careInformation", "fertilization"]}
              label="Fertilization"
              rules={[
                {
                  required: true,
                  message: "Please input the fertilization requirements!",
                },
              ]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                marginLeft: "16px",
              }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["careInformation", "pruning"]}
              label="Pruning"
              rules={[
                {
                  required: true,
                  message: "Please input the pruning requirements!",
                },
              ]}
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["careInformation", "pestsAndDiseases"]}
              label="Pests and Diseases"
              rules={[
                {
                  required: true,
                  message: "Please input the pests and diseases information!",
                },
              ]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                marginLeft: "16px",
              }}
            >
              <Input />
            </Form.Item>
          </Form.Item>

          <Form.Item label="Additional Information" style={{ marginBottom: 0 }}>
            <Form.Item
              name={["additionalInformation", "origin"]}
              label="Origin"
              rules={[{ required: true, message: "Please input the origin!" }]}
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["additionalInformation", "seasonality"]}
              label="Seasonality"
              rules={[
                { required: true, message: "Please input the seasonality!" },
              ]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                marginLeft: "16px",
              }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["additionalInformation", "hardiness"]}
              label="Hardiness"
              rules={[
                { required: true, message: "Please input the hardiness!" },
              ]}
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["additionalInformation", "toxicity"]}
              label="Toxicity"
              rules={[
                { required: true, message: "Please input the toxicity!" },
              ]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                marginLeft: "16px",
              }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["additionalInformation", "uses"]}
              label="Uses"
              rules={[{ required: true, message: "Please input the uses!" }]}
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            >
              <Input />
            </Form.Item>
          </Form.Item>

          {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
};

export default ProductAndCategoryManagementTable;
