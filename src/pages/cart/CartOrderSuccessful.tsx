import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";

const CartOrderSuccessful = () => {
  return (
    <Result
      status="success"
      title="Successfully Purchased Order!"
      subTitle="Order number: 2017182818828182881 Your order will arrive at your address within 2-7 days, please wait."
      extra={[
        <NavLink to={"/"}>
          <Button key="buy">Go to home</Button>
        </NavLink>,
      ]}
    />
  );
};

export default CartOrderSuccessful;
