import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../store/actions/wishlistAction';
import toast from 'react-hot-toast';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ProductCard } from '../ProductListing/ProductListing';
// const products = [
//   {
//     id: 1,
//     name: 'Alexandria Cloth Organizer - BFC401',
//     price: 13500.00,
//     image: 'https://i.postimg.cc/wMycKC9G/2ae7f078-0899-4cc5-ae08-a8ee33dc1930.jpg',
//     isNew: true,
//   },
//   {
//     id: 2,
//     name: 'Tudor Wardrobe - BFC403',
//     price: 14400.00,
//     image: 'https://i.postimg.cc/mDryjcJR/326b5366-face-4981-b089-938e98643dbb.jpg',
//     isNew: true,
//   },
//   {
//     id: 3,
//     name: 'Florentine Wardrobe - BFC402',
//     price: 16500.00,
//     originalPrice: 17500.00,
//     image: 'https://i.postimg.cc/y8qnK8gX/63257b1f-05f0-4e86-a6d9-2229d51425cb.jpg',
//     isNew: true,
//     discount: '-6%',
//   },
//   {
//     id: 4,
//     name: 'CPU Cruiser - BFA301',
//     price: 899.00,
//     image: 'https://i.postimg.cc/bvpTGVRZ/64cc0f48-7c74-4cee-b050-84f34e341002.jpg',
//     isNew: true,
//   },
//   {
//     id: 5,
//     name: 'Calmness Study Table - BFT012',
//     price: 9000.00,
//     image: 'https://i.postimg.cc/zDV9X3B9/8a33a04a-4040-4fa8-a3e3-9587496afefd.jpg',
//     isNew: true,
//   },
// ].concat(Array(10).fill().map((_, i) => ({
//   id: i + 6,
//   name: `Product ${i + 6}`,
//   price: 9999.00,
//   image: [
//     'https://i.postimg.cc/qRZX5JHK/8c0e6a04-d906-465e-8d0f-fa6e9ee494bb.jpg',
//     'https://i.postimg.cc/PrvK0wx5/a47da85e-eee0-4cb9-99a3-bcb2ee2da0f4.jpg',
//     'https://i.postimg.cc/6qgcy9HK/b8ea5777-1c18-46f4-b7af-e1b61feb8fe2.jpg',
//     'https://i.postimg.cc/rwSjw256/c3f2925d-0515-4fc9-ba23-8c9300305314.jpg',
//     'https://i.postimg.cc/90r1m4Y1/c9aac6fa-7c7d-4a63-84ee-fde978fcdd0d.jpg',
//     'https://i.postimg.cc/v8N3PzGK/d027d112-c56a-439a-a382-8615c84c1c75.jpg',
//     'https://i.postimg.cc/nzd0fKBC/f4cef422-b87b-44d0-9551-746c0523c1b3.jpg',
//   ][i % 7], // Rotates through the image array
//   isNew: true,
// })));

const ProductSlider = () => {


  
const {data: products=[]} = useQuery({
queryKey: 'products',
queryFn: async() => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/customer/products`);

  return response.data;
}
  })
  return (
    <div className="px-4 py-8">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">New Products</h2>
      <a href="#" className="text-teal-600 hover:underline">View All</a>
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
          <ProductCard product={product}/>
        </SwiperSlide>
      ))}

      
      
    </Swiper>
  </div>
  
  );
};

export default ProductSlider;