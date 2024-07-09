import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-16 bg-veryDarkBlue">
      {/* <!-- Footer Flex Container --> */}
      <div className="container flex flex-col items-center justify-between mx-auto space-y-16 px-16 md:flex-row md:space-y-0">
        {/* <!-- Logo/Menu Container --> */}
        <div className="flex flex-col items-center justify-between space-y-8 text-lg font-light md:flex-row md:space-y-0 md:space-x-14 text-grayishBlue">
          {/* <img
            src="./images/logo-bookmark-footer.svg"
            alt=""
            className="mb-1"
          /> */}
          <NavLink to={"/"} className="font-bold text-3xl mb-1">
            Green<span className="text-lime-500">LN</span>
          </NavLink>

          <NavLink to={"/products"} className="uppercase hover:text-softBlue">
            Products
          </NavLink>
          <NavLink to={"/#"} className="uppercase hover:text-softBlue">
            Download
          </NavLink>
          <NavLink to={"/"} className="uppercase hover:text-softBlue">
            FAQ
          </NavLink>
        </div>

        {/* <!-- Social Container --> */}
        <div className="flex space-x-10">
          <a href="#">
            <img
              src="./images/icon-facebook.svg"
              alt=""
              className="h-6 ficon"
            />
          </a>
          <a href="#">
            <img src="./images/icon-twitter.svg" alt="" className="h-6 ficon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
