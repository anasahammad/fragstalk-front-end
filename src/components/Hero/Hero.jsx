import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function Hero() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const { data: banners } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/banner`);
      return response.data;
    },
  });

  return (
    <div className="mx-auto w-full  lg:mt-16 overflow-hidden">
      <div className=" z-10">
        <Slider {...settings}>
          {banners?.map((image, index) => (
            <div key={index} className="w-full max-h-[200px] md:max-h-[300px] lg:max-h-[400px]">
              <img
                src={image.bannerPhoto || "/placeholder.svg"}
                alt={`Slide ${index + 1}`}
                className="w-full min-h-full object-cover object-center"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
