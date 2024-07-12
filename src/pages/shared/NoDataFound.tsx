import { ExclamationCircleOutlined } from "@ant-design/icons";

const NoDataFound = () => {
  return (
    <div className="container mx-auto my-10">
      <h1 className="text-xl md:text-2xl lg:text-3xl text-center">
        <span className="bg-lime-200 px-4 py-2 rounded-md ">
          <span>
            <ExclamationCircleOutlined className="me-4 " />
          </span>
          ! No Data Found!
        </span>
      </h1>
    </div>
  );
};

export default NoDataFound;
