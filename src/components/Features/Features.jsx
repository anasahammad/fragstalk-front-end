import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules"; // Updated import for Swiper modules
import { FaShieldAlt, FaHeadset, FaCreditCard, FaArrowLeft, FaArrowRight } from "react-icons/fa";

export function Features() {
    const features = [
      {
        icon: <FaShieldAlt className="text-[40px] text-gray-700 " />,
        title: "Returns & Warranty",
        description:
          "Buy with confidence!",
      },
      {
        icon: <FaHeadset className="text-[40px] text-gray-700 " />,
        title: "Customer Support",
        description:
          "Get help anytime!",
      },
      {
        icon: <FaCreditCard className="text-[40px] mt-1 text-gray-700 " />,
        title: "EMI Available",
        description:
          "Buy now, pay later!",
      },
    ];
  
    return (
      <div className="py-5 mx-3 md:py-3 md:mb-7 overflow-hidden border-2 md:border-none bg-white md:shadow-md md:w-10/12 md:mx-auto relative bottom-5">
        <div className="">
    
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            modules={[Navigation]}  
          >
            {features.map((feature, index) => (
              <SwiperSlide key={index}>
                <div className="flex gap-4 bg-white items-center justify-center rounded-lg  py-7 px-4 transition-transform duration-300 text-left">
                  <div>{feature.icon}</div>
                  <div>
                  <h3 className="text-base font-bold text-gray-800 ">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm ">{feature.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
         
          <div className="swiper-button-prev-custom absolute top-1/2 left-8 transform -translate-y-1/2 text-gray-700 text-2xl cursor-pointer z-10">
            <FaArrowLeft />
          </div>
          <div className="swiper-button-next-custom absolute top-1/2 right-8 transform -translate-y-1/2 text-gray-700 text-2xl cursor-pointer z-10">
            <FaArrowRight />
          </div>
        </div>
      </div>
    );
  }
  