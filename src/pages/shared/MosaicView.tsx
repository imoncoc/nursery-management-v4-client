const MosaicView = () => {
  return (
    <div className="container mx-auto my-20">
      <div className=" mx-auto my-4 px-6">
        <h2 className="mb-6 text-4xl font-semibold text-center uppercase">
          Photo Gallery
        </h2>
        <p className="max-w-md mx-auto text-center text-grayishBlue">
          Discover our expansive collection of stunning trees, shrubs, and
          plants, meticulously curated to enrich every garden and landscape.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px]">
        <div className="relative row-span-2">
          <img
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
            src="https://images.unsplash.com/photo-1615362207113-b5caa2384dbf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="relative col-span-2 row-span-2">
          <img
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
            src="https://images.unsplash.com/photo-1530027644375-9c83053d392e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="relative">
          <img
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
            src="https://images.unsplash.com/photo-1519180392711-496e450edf6a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="relative row-span-2">
          <img
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
            src="https://images.unsplash.com/photo-1714376192606-1bd1e9d29b6b?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="relative col-span-2 row-span-2">
          <img
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
            src="https://images.unsplash.com/photo-1633744438304-36b75626f597?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="relative">
          <img
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
            src="https://images.unsplash.com/photo-1628486930972-c1db82d528da?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="relative">
          <img
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
            src="https://images.unsplash.com/photo-1503327655231-9a047d4772b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="relative row-span-3">
          <img
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
            src="https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="relative row-span-2">
          <img
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
            src="https://plus.unsplash.com/premium_photo-1674630069141-d19e75511856?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="relative col-span-2 row-span-2">
          <img
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
            src="https://images.unsplash.com/photo-1501084291732-13b1ba8f0ebc?q=80&w=1736&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default MosaicView;
