import { Spin } from "antd";

const Loading = () => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center my-20">
        <Spin size="large" />
      </div>
    </div>
  );
};

export default Loading;
