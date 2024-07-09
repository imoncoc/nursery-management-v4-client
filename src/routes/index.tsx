import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Product from "../pages/products/Product";
import Hero from "../pages/shared/Hero";
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
            <Product />
          </>
        ),
      },
      {
        path: "/products",
        element: <Product />,
      },
    ],
  },
  {
    path: "/products",
    element: <Product />,
  },
]);

export default router;
