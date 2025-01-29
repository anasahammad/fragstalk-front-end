import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
  return (
     <div className="relative ">
        <div className="relative z-10">
          <Slider {...settings}>
            {['/../src/assets/banner1.png', '/../src/assets/banner2.png'].map((image, index) => (
              <div key={index}>
                <img
                  src={image || "/placeholder.svg"}
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
