import { Button, Card, Rate } from "antd";
import { TProduct } from "./Product.interface";
const { Meta } = Card;

const ProductCard = ({ item }: any) => {
  const { thumbnail, name, description, price, rating }: TProduct = item;
  console.log("item: ", item);
  const onCustomButtonClick = () => {};
  return (
    <Card
      hoverable
      style={{ width: "100%", maxWidth: 320 }}
      actions={[
        <div className="flex flex-col gap-y-4 md:gap-y-0 md:flex-row justify-between mx-4">
          <button className="px-6 py-2 text-sm font-semibold text-white bg-softLime rounded shadow-md border-2 border-softLime md:text-base hover:bg-white hover:text-softLime">
            Add to Cart
          </button>

          <button className="px-6 py-2 text-sm font-semibold text-black bg-gray-300 rounded shadow-md border-2 border-gray-300 md:text-base hover:bg-white hover:text-gray-600">
            View Details
          </button>
        </div>,
      ]}
      cover={<img alt="example" className="h-[210px]" src={thumbnail} />}
    >
      <Meta title={name} description={description} />
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-lime-500 px-3 py-1  rounded">
            <span className="text-gray-500">Price:</span> ${price}
          </span>
          <Rate disabled allowHalf defaultValue={rating} />
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
