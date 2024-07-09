import { Outlet } from "react-router-dom";
import Footer from "../../pages/shared/Footer";
import Hero from "../../pages/shared/Hero";
import Navbar from "../../pages/shared/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
