import "./ProductDetails.css";
import { Tabs } from "antd";
import { TProduct } from "../Product.interface";
import TabItems from "./ProductDetails.utils";

const ProductDetailsTab = (productData: TProduct) => {
  const { additionalInformation, careInformation, physicalCharacteristics } =
    productData;

  const onChange = (key: string) => {
    console.log(key);
  };

  const items = TabItems(
    additionalInformation,
    careInformation,
    physicalCharacteristics
  );

  return (
    <div>
      <Tabs onChange={onChange} type="card" items={items} />
    </div>
  );
};

export default ProductDetailsTab;
