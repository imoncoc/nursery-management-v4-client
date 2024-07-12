import {
  decrementQuantity,
  incrementQuantity,
  selectCurrentCart,
} from "../../redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Button } from "antd";
import { TProduct } from "../products/Product.interface";
import NoDataFound from "../shared/NoDataFound";
import { ArrowRightOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const Cart = () => {
  const { products } = useAppSelector(selectCurrentCart);
  const dispatch = useAppDispatch();
  console.log("product: ", products);
  console.log("product length: ", products?.length);

  const handleQuantityPlus = (id: string) => {
    dispatch(incrementQuantity(id));
  };
  const handleQuantityMinus = (id: string) => {
    dispatch(decrementQuantity(id));
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    products.forEach((product) => {
      totalPrice += (product.quantity ? product.quantity : 1) * product.price;
    });
    return totalPrice;
  };

  return (
    <div className="container mx-auto p-4">
      {products?.length == 0 ? (
        <NoDataFound />
      ) : (
        <div>
          <table className="table-auto w-full bg-lime-100 rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-veryDarkBlue text-white ">
              <tr>
                <th className="px-4 py-2">No.</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Category Name</th>
                <th className="px-4 py-2">Stock</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Action</th>
                <th className="px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: TProduct, index: number) => (
                <tr
                  key={product?._id}
                  className="bg-gray-100 hover:bg-gray-200"
                >
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">
                    <img
                      src={product?.thumbnail}
                      className="w-16 h-12 mx-auto"
                      alt=""
                    />
                  </td>
                  <td className="border px-4 py-2">{product?.name}</td>
                  <td className="border px-4 py-2">
                    {product?.categoriesName}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {product?.stock}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    ${product?.price}
                  </td>
                  <td className="border mx-auto px-4 py-2 text-center space-x-1">
                    <div className="flex gap-4 justify-center items-center">
                      <Button
                        type="primary"
                        danger
                        onClick={() =>
                          handleQuantityMinus(product?._id as string)
                        }
                        disabled={product?.quantity === 1}
                      >
                        -
                      </Button>

                      <div className="bg-veryDarkBlue text-white rounded-md px-4 py-1">
                        {product?.quantity}
                      </div>
                      <Button
                        type="primary"
                        onClick={() =>
                          handleQuantityPlus(product?._id as string)
                        }
                        disabled={product?.stock === 0}
                      >
                        +
                      </Button>
                    </div>
                  </td>
                  <td className="border px-4 py-2 text-center font-semibold">
                    ${product?.price * (product?.quantity || 1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end my-4">
            <div className="">
              <div className="bg-veryDarkBlue  rounded-md px-8 py-4 my-4 text-gray-300 font-semibold">
                Total:{" "}
                <span className="text-gray-100">${calculateTotalPrice()}</span>
              </div>

              <div className="">
                <NavLink to={"/cart-checkout"}>
                  <button className="custom-button-primary w-full">
                    Checkout
                    <span className="ms-2">
                      <ArrowRightOutlined />
                    </span>
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
