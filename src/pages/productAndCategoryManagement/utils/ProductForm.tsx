import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import type { FormProps } from "antd";
import { TProduct } from "../../products/Product.interface";

type FieldType = Partial<TProduct>;

const ProductForm: React.FC<{
  onFinish: FormProps<FieldType>["onFinish"];
  onFinishFailed: FormProps<FieldType>["onFinishFailed"];
  initialValues?: TProduct;
}> = ({ onFinish, onFinishFailed, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  return (
    <Form
      name="productForm"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      style={{ width: "100%" }}
      //   initialValues={{ remember: true }}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item<TProduct>
        label="Title"
        name="name"
        rules={[{ required: true, message: "Please input the product name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<TProduct>
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please input the description!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<TProduct>
        label="Price"
        name="price"
        rules={[{ required: true, message: "Please input the price!" }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item<TProduct>
        label="Stock"
        name="stock"
        rules={[{ required: true, message: "Please input the stock!" }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item label="Physical Characteristics" style={{ marginBottom: 0 }}>
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
          rules={[{ required: true, message: "Please input the growth rate!" }]}
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
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["physicalCharacteristics", "plantingZone"]}
          label="Planting Zone"
          rules={[
            { required: true, message: "Please input the planting zone!" },
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
          rules={[{ required: true, message: "Please input the soil type!" }]}
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
          rules={[{ required: true, message: "Please input the seasonality!" }]}
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
          rules={[{ required: true, message: "Please input the hardiness!" }]}
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["additionalInformation", "toxicity"]}
          label="Toxicity"
          rules={[{ required: true, message: "Please input the toxicity!" }]}
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

      <Form.Item wrapperCol={{ span: 24 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
