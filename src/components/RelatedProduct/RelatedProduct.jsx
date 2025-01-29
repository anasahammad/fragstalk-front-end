import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
const products = [
  {
    id: 1,
    name: 'Alexandria Cloth Organizer - BFC401',
    price: 13500.00,
    image: 'https://i.postimg.cc/wMycKC9G/2ae7f078-0899-4cc5-ae08-a8ee33dc1930.jpg',
    isNew: true,
  },
  {
    id: 2,
    name: 'Tudor Wardrobe - BFC403',
    price: 14400.00,
    image: 'https://i.postimg.cc/mDryjcJR/326b5366-face-4981-b089-938e98643dbb.jpg',
    isNew: true,
  },
  {
    id: 3,
    name: 'Florentine Wardrobe - BFC402',
    price: 16500.00,
    originalPrice: 17500.00,
    image: 'https://i.postimg.cc/y8qnK8gX/63257b1f-05f0-4e86-a6d9-2229d51425cb.jpg',
    isNew: true,
    discount: '-6%',
  },
  {
    id: 4,
    name: 'CPU Cruiser - BFA301',
    price: 899.00,
    image: 'https://i.postimg.cc/bvpTGVRZ/64cc0f48-7c74-4cee-b050-84f34e341002.jpg',
    isNew: true,
  },
  {
    id: 5,
    name: 'Calmness Study Table - BFT012',
    price: 9000.00,
    image: 'https://i.postimg.cc/zDV9X3B9/8a33a04a-4040-4fa8-a3e3-9587496afefd.jpg',
    isNew: true,
  },
].concat(Array(10).fill().map((_, i) => ({
  id: i + 6,
  name: `Product ${i + 6}`,
  price: 9999.00,
  image: [
    'https://i.postimg.cc/qRZX5JHK/8c0e6a04-d906-465e-8d0f-fa6e9ee494bb.jpg',
    'https://i.postimg.cc/PrvK0wx5/a47da85e-eee0-4cb9-99a3-bcb2ee2da0f4.jpg',
    'https://i.postimg.cc/6qgcy9HK/b8ea5777-1c18-46f4-b7af-e1b61feb8fe2.jpg',
    'https://i.postimg.cc/rwSjw256/c3f2925d-0515-4fc9-ba23-8c9300305314.jpg',
    'https://i.postimg.cc/90r1m4Y1/c9aac6fa-7c7d-4a63-84ee-fde978fcdd0d.jpg',
    'https://i.postimg.cc/v8N3PzGK/d027d112-c56a-439a-a382-8615c84c1c75.jpg',
    'https://i.postimg.cc/nzd0fKBC/f4cef422-b87b-44d0-9551-746c0523c1b3.jpg',
  ][i % 7], // Rotates through the image array
  isNew: true,
})));

const  RelatedProduct = () => {
  return (
    <div className="px-4 py-8">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl text-center font-bold">Related Products</h2>
 
    </div>
  
    <Swiper
      modules={[Navigation]}
      navigation={true}
      spaceBetween={20}
      breakpoints={{
        320: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 5,
        },
      }}
      className="relative "
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <div className="bg-white rounded-lg overflow-hidden shadow-md group">
            <div className="relative">
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-300"
              />
  
              {/* Badges for New and Discount */}
              <div className="absolute top-2 left-2 flex gap-2">
                {product.isNew && (
                  <span className="bg-white px-2 py-1 text-xs rounded">New</span>
                )}
                {product.discount && (
                  <span className="bg-red-500 text-white px-2 py-1 text-xs rounded">
                    {product.discount}
                  </span>
                )}
              </div>
  
              {/* Interactive Buttons */}
              <div className="absolute top-2 right-2 flex gap-2">
                <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
                <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
  
              {/* Quick Add Button */}
              <Link to={`/productdetails/${product.id}`}>
  <div
    className="absolute bottom-0 left-0 right-0 bg-black text-white text-center py-2 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
  >
    QUICK ADD
  </div>
</Link>
            </div>
  
            {/* Product Details */}
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-2 truncate">
                {product.name}
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold">
                  Tk {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    Tk {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
  
  );
};

export default  RelatedProduct;