import "./Hero.css";
import illustrationHero from "../../assets/images/hero.jpg";

const Hero = () => {
  return (
    <section id="hero" className="overflow-x-hidden">
      {/* <!-- Container For Image & Content --> */}
      <div className="container flex flex-col-reverse mx-auto mb-12 p-6 lg:flex-row lg:mb-0">
        {/* <!-- Content --> */}
        <div className="flex flex-col space-y-10 lg:mt-16 lg:w-1/2">
          <h1 className="text-3xl font-semibold text-center lg:text-6xl lg:text-left mt-5 lg:mt-0">
            About <span className="text-lime-500">Green</span> Leaves Nursery
          </h1>
          <p className="max-w-md mx-auto text-lg text-center text-gray-400 lg:text-2xl lg:text-left lg:mt-0 lg:mx-0">
            Discover a wide variety of trees for your home and garden. Our
            user-friendly interface makes it easy to browse and purchase the
            perfect trees. Shop now and transform your landscape.
          </p>

          {/* <!-- Buttons Container  --> */}
          <div className="flex items-center justify-center w-full space-x-4 lg:justify-start">
            <button className="p-4 text-sm font-semibold text-white bg-softLime rounded shadow-md border-2 border-softLime md:text-base hover:bg-white hover:text-softLime">
              Get it On Chrome
            </button>

            <button className="p-4 text-sm font-semibold text-black bg-gray-300 rounded shadow-md border-2 border-gray-300 md:text-base hover:bg-white hover:text-gray-600">
              Get it On Firefox
            </button>
          </div>
        </div>
        {/* <!-- Images --> */}
        <div className="relative mx-auto lg:mx-0 lg:mb-0 lg:w-1/2">
          <div className="bg-hero"></div>

          <img
            src={illustrationHero}
            alt=""
            className="relative z-10 lg:top-24 xl:top-0 overflow-x-visible  "
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
