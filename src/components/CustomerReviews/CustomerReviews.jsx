// import { FaStar, FaClock, FaShareAlt, FaArrowUp, FaFacebook, FaWhatsapp } from 'react-icons/fa';
 

// export default function CustomerReviews() {

//   const handleScrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleWhatsAppShare = () => {
//     const phoneNumber = "+8801733550682"; // আপনার WhatsApp নম্বর (দেশ কোড সহ)
//     const message = encodeURIComponent("Hello! I wanted to reach out to you."); // মেসেজ কন্টেন্ট
//     const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

//     window.open(whatsappURL, "_blank"); // নতুন ট্যাবে লিঙ্ক ওপেন করবে
//   };


//   return (
//     <section className="container mx-auto px-4 py-12">
//       <div className="mb-8">
//         <h2 className="text-3xl font-bold mb-4">Customer Reviews</h2>
//         <p className="text-muted-foreground mb-4">
//           Pellentesque ante neque, faucibus et delito an pretium vestibulum del varius quam.
//         </p>
    
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* Review 1 */}    
//         <div className="space-y-4">
//           <div className="relative w-full overflow-hidden rounded-lg">
//             <img
//               src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-01-11%2018-44-20-GqtxxQHbRozFykh0wDJmBXsbNcPa3H.png"
//               alt="Office desk setup"
             
//               className="object-cover"
//             />
//           </div>
//           <div className="flex gap-1">
//             {Array(5).fill(null).map((_, i) => (
//               <FaStar key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
//             ))}
//           </div>
//           <p className="text-sm text-muted-foreground">
//             They are very professional in maintaining quality and are committed to what they do.
//           </p>
//         </div>

//         {/* Review 2 */}
//         <div className="space-y-4">
//           <div className="relative w-full overflow-hidden rounded-lg">
//             <img
//               src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-01-11%2018-44-20-GqtxxQHbRozFykh0wDJmBXsbNcPa3H.png"
//               alt="Cafe interior"
            
//               className="object-cover"
//             />
//           </div>
//           <div className="flex gap-1">
//             {Array(5).fill(null).map((_, i) => (
//               <FaStar key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
//             ))}
//           </div>
//           <p className="text-sm text-muted-foreground">
//             The quality of everything in their store is very good. Their service is very nice. I am very happy with the things they have. You can take them.
//           </p>
//           <p className="font-medium">Jalish Mahmud</p>
//         </div>

//         {/* Review 3 */}
//         <div className="space-y-4">
//           <div className="relative w-full overflow-hidden rounded-lg">
//             <img
//               src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-01-11%2018-44-20-GqtxxQHbRozFykh0wDJmBXsbNcPa3H.png"
//               alt="Modern cafe interior"
            
//               className="object-cover"
//             />
//           </div>
//           <div className="flex gap-1">
//             {Array(5).fill(null).map((_, i) => (
//               <FaStar key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
//             ))}
//           </div>
//           <p className="text-sm text-muted-foreground">
//           Pramanik Furniture  was incredible! The quality, style, and durability of the furniture transformed my cafe into a cozy, stylish space. Highly recommend them for anyone needing top-notch furniture and service.
//           </p>
//           <p className="font-medium">Sojib</p>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="fixed bottom-[50%] right-4 flex flex-col gap-2 z-[500]">
//         <a href="https://web.facebook.com/profile.php?id=61571605043376" target="_blank" className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50">
//           <FaFacebook className="w-5 h-5 text-[#0866FF]" />
//         </a>
//         <button    onClick={handleWhatsAppShare} className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50">
//           <FaWhatsapp className="w-5 h-5 text-[#075E54]" />
//         </button>
//         <button  onClick={handleScrollToTop} className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50">
//           <FaArrowUp className="w-5 h-5" />
//         </button>
//       </div>
//     </section>
//   );
// }

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const CustomerReviews = () => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  const {data:reviews =[]} = useQuery({
    queryKey: 'reviews',
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/review`);
      return response.data;
    }
  });

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Customer Reviews</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews?.slice(0, 3).map((review) => (
            <div key={review._id} className="bg-gray-50 rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=random`}
                    alt={review.name}
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">{review.name}</h3>
                  <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center mb-2">
                {renderStars(review.rating)}
                <span className="ml-2 text-sm text-gray-600">({review.rating}/5)</span>
              </div>
              <p className="text-gray-700">{review.review}</p>
              {/* {review.status === 'pending' && (
                <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
                  Pending Approval
                </span>
              )} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;