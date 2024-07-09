import Footer from "../../pages/shared/Footer";
import Hero from "../../pages/shared/Hero";
import Navbar from "../../pages/shared/Navbar";
import Homes from "../ui/Homes";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Homes />
      <Footer />
    </div>
  );
};

export default MainLayout;
