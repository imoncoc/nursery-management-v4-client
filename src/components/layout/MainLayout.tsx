import { Outlet } from "react-router-dom";
import Footer from "../../pages/shared/Footer";
import Navbar from "../../pages/shared/Navbar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearCart, selectCurrentCart } from "../../redux/features/cartSlice";
import { useEffect, useState } from "react";
import CartWarningModal from "./CartWarningModal";

const MainLayout = () => {
  const { products } = useAppSelector(selectCurrentCart);
  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      if (products.length > 0) {
        event.preventDefault();
        setShowModal(true); // Show modal instead of alert
      }
    };

    const handleUnload = () => {
      if (products.length > 0) {
        dispatch(clearCart());
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, [products, dispatch]);

  const handleModalConfirm = () => {
    setShowModal(false);
    dispatch(clearCart());
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
      <CartWarningModal
        visible={products?.length > 0 && showModal}
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
      />
    </div>
  );
};

export default MainLayout;
