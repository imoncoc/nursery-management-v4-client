import { selectCurrentCart } from "../../redux/features/cartSlice";
import { useAppSelector } from "../../redux/hooks";

const Cart = () => {
  const product = useAppSelector(selectCurrentCart);
  console.log("product: ", product);
  return (
    <div>
      <h1>Hello, Cart!</h1>
    </div>
  );
};

export default Cart;
