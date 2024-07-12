import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Product from "../pages/products/Product";
import Hero from "../pages/shared/Hero";
import ProductDetails from "../pages/products/productDetails/ProductDetails";
import Cart from "../pages/cart/Cart";
import ProductAndCategoryManagement from "../pages/productAndCategoryManagement/ProductAndCategoryManagement";
import CategoriesName from "../pages/shared/CategoriesName";
import MosaicView from "../pages/shared/MosaicView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <>
            <Hero />
            <CategoriesName />
            <Product />
            <MosaicView />
          </>
        ),
      },
      {
        path: "/products",
        element: <Product />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/product-and-category",
        element: <ProductAndCategoryManagement />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

export default router;
