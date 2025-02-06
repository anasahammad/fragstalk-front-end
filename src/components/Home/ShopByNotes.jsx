import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';


const ShopByNotes = () => {

  const {data = []} = useQuery({
    queryKey: 'aromas',
    queryFn: async() => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/aroma`);
      return response.data;
    }
  })
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-center text-2xl font-bold mb-8">SHOP BY Luxury Category</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {data?.map((category) => (
          <Link to={`/notes/${category._id}`}  key={category._id} className="relative group cursor-pointer">
            <div className="aspect-square relative overflow-hidden rounded-full">
              {/* Image Container */}
              <div className="w-full h-full absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Category Name */}
              <Link to={`/notes/${category._id}`} className="absolute bottom-0 left-0 right-0 bg-[#1C1047] bg-opacity-90 font-semibold hover:bg-opacity-20 text-white text-center py-2 text-sm">
                {category.name}
              </Link>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopByNotes;