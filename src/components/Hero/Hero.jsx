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
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false
        }
      }
    ]
  };

  const {data:banners} = useQuery({
    queryKey: ['banners'],
    queryFn: async()=>{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/banner`);
        return response.data;
    }
    })
  return (
     <div className="relative ">
        <div className="relative z-10">
          <Slider {...settings}>
            {banners?.map((image, index) => (
              <div key={index}>
                <img
                  src={image.bannerPhoto || "/placeholder.svg"}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div> 
  );
}
