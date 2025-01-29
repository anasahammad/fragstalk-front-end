import banner from "../../assets/banner 3.png";

const LuxuryHome = () => {
  return (
    <div className=" text-center py-10">
      <h2 className=" text-xl font-semibold uppercase tracking-widest mb-6">
        Luxury Categories
      </h2>
      <div className="relative">
        <div className="overflow-hidden ">
          <img
            src={banner} // Replace with your uploaded image URL
            alt="Luxury Categories"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default LuxuryHome;
