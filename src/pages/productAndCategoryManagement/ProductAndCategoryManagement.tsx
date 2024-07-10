import ProductAndCategoryManagementTable from "./ProductAndCategoryManagementTable";

const ProductAndCategoryManagement = () => {
  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(10);
  // const [total, setTotal] = useState(0);
  // const {
  //   data: products,
  //   isSuccess: isProductSuccess,
  //   isLoading,
  //   isFetching,
  // } = useGetProductsQuery({
  //   page,
  //   limit,
  // });

  // console.log("ProductAndCategoryManagement data: ", products);

  return (
    <div className="my-4">
      <ProductAndCategoryManagementTable />
    </div>
  );
};

export default ProductAndCategoryManagement;
