import { useNavigate, useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../../redux/api/api";
import { TProduct } from "../Product.interface";
import { Image, Rate, Tag } from "antd";
import ProductDetailsTab from "./ProductDetailsTab";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../../redux/hooks";
import { addProduct } from "../../../redux/features/cartSlice";
import NoDataFound from "../../shared/NoDataFound";

const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProductDetailsQuery(id);
  const productData = data?.data[0];

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Error loading data</div>;
  }

  if (!productData) {
    return <NoDataFound />;
  }

  const {
    name,
    thumbnail,
    images,
    price,
    rating,
    availabilityStock,
    categoriesName,
    description,
    stock,
  }: TProduct = productData;

  const handleOnClickDetails = (productData: TProduct) => {
    dispatch(addProduct(productData));
    // console.log("handleOnClickDetails: ", productData);
  };

  return (
    <div className="container mx-auto my-4">
      {productData && (
        <div className="flex flex-col md:flex-row md:justify-between w-full gap-16">
          <div className="flex-1">
            <div className=" text-center rounded-4">
              <Image
                src={thumbnail}
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              />
            </div>
            <div className="grid grid-cols-6 gap-4 my-4">
              {images.map((img, ind) => (
                <Image
                  className="border"
                  src={img}
                  key={ind}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "4px",
                    margin: "auto",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex-1 py-8 flex flex-col justify-center">
            <p className="custom-text-details-header text-lime-500"> {name}</p>
            <p className="custom-text-details-p">{description}</p>
            {/* <p> rating: {rating}</p> */}
            <div>
              <Rate
                style={{ color: "rgb(132 204 22)" }}
                disabled
                allowHalf
                defaultValue={rating}
              />
            </div>

            <div className="flex gap-2 my-1">
              <div>
                <Tag color="#55acee">{categoriesName}</Tag>
              </div>

              <div className="">
                {availabilityStock ? (
                  <Tag bordered={false} color="rgb(132 204 22)">
                    {stock} In Stock
                  </Tag>
                ) : (
                  <Tag bordered={false} color="error">
                    Out of Stock
                  </Tag>
                )}
              </div>
            </div>

            <div className="mb-4 mt-2 font-semibold">
              <span className="bg-slate-300 px-4 py-2 rounded-lg">
                <span className="text-gray-500 ">Price:</span>{" "}
                <span className="">${price}</span>
              </span>
            </div>
            <div>
              <button
                className="custom-button-primary"
                onClick={() => handleOnClickDetails(productData)}
                disabled={stock === 0 || availabilityStock === false}
              >
                {stock === 0 || availabilityStock === false
                  ? "Stock out"
                  : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      )}
      <div>
        <ProductDetailsTab {...productData} />
      </div>

      <div className="flex justify-end py-4">
        <button
          onClick={() => navigate(-1)}
          className="custom-button-secondary group"
        >
          <span>
            <ArrowLeftOutlined className="me-2 group-hover:animate-ping " />
          </span>
          <span>Go Back</span>
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
