import type { FormProps } from "antd";
import { Button, Form, Input, Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearCart, selectCurrentCart } from "../../redux/features/cartSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useUpdateStockByQuantityProductsMutation } from "../../redux/api/api";
import Loading from "../shared/Loading";

const { Option } = Select;

type FieldType = {
  fullName?: string;
  phoneNumber?: string;
  address?: string;
  payment?: string;
};

const CartCheckout = () => {
  const { products } = useAppSelector(selectCurrentCart);
  const navigate = useNavigate();
  const [updateStockByQuantityProducts, { isSuccess, isError, isLoading }] =
    useUpdateStockByQuantityProductsMutation();
  const dispatch = useAppDispatch();

  const getStock = products?.map((item) => ({
    id: item?._id,
    quantity: item?.quantity,
  }));

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    toast.success("Successfully ordered.");
    await updateStockByQuantityProducts(getStock);
    console.log("Success:", values);
  };

  if (isLoading) {
    <Loading />;
  }
  if (isSuccess) {
    dispatch(clearCart());
    navigate("/cart/order-successful");
  }

  if (isError) {
    toast.error("Order failed, try again.");
  }

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    products.forEach((product) => {
      totalPrice += (product.quantity ? product.quantity : 1) * product.price;
    });
    return totalPrice;
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
    toast.error("Order failed. Please re-check form.");
  };
  return (
    <div className="container mx-auto my-10">
      <div className=" mx-auto mt-4 px-6">
        <h2 className="mb-6 text-4xl font-semibold text-center uppercase">
          your information
        </h2>
        <p className="max-w-md mx-auto text-center text-grayishBlue">
          Discover essential details about our products, services, and policies
          to enhance your shopping experience.
        </p>
      </div>

      {/* form */}
      <div className=" flex justify-center my-8 ">
        <div className="bg-gray-100 w-full lg:w-[600px] px-8 pt-12 pb-4 rounded-md">
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 24 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="FullName"
              name="fullName"
              rules={[
                { required: true, message: "Please input your Full name!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Phone Number"
              name="phoneNumber"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="payment"
              label="Select payment"
              rules={[{ required: true, message: "Payment is required" }]}
            >
              <Select
                placeholder="Select your payment system"
                // onChange={onGenderChange}
                allowClear
              >
                <Option value="CashOnDelivery">Cash on delivery</Option>
                {/* <Option value="female">female</Option>
                <Option value="other">other</Option> */}
              </Select>
            </Form.Item>

            <div className="flex justify-end">
              <div className="bg-veryDarkBlue w-3/4 text-center  rounded-md px-8 py-2 mb-4 text-gray-300 font-semibold">
                Total:{" "}
                <span className="text-gray-100">${calculateTotalPrice()}</span>
              </div>
            </div>

            <div className="flex justify-end px-6">
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CartCheckout;
