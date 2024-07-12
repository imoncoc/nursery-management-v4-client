import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";

const CartOrderSuccessful = () => {
  return (
    <Result
      status="success"
      title="Successfully Purchased Cloud Server ECS!"
      subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      extra={[
        <NavLink to={"/"}>
          <Button key="buy">Go to home</Button>
        </NavLink>,
      ]}
    />
  );
};

export default CartOrderSuccessful;
