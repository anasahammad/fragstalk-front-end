import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { BiPlus } from 'react-icons/bi';

// const collections = [
//   {
//     id: 1,
//     title: "Home Furniture",
//     image: "https://i.postimg.cc/90r1m4Y1/c9aac6fa-7c7d-4a63-84ee-fde978fcdd0d.jpg ",
//   },
//   {
//     id: 2,
//     title: "Office Furniture",
//     image: "https://i.postimg.cc/6qgcy9HK/b8ea5777-1c18-46f4-b7af-e1b61feb8fe2.jpg",
//   },
//   {
//     id: 3,
//     title: "Restaurant Furniture",
//     image: "https://i.postimg.cc/qRZX5JHK/8c0e6a04-d906-465e-8d0f-fa6e9ee494bb.jpg",
//   },
//   {
//     id: 4,
//     title: "Industrial Furniture",
//     image: "https://i.postimg.cc/vmhv57P3/10c4ed96-5200-4514-999d-eca8a87e09cf.jpg",
//   }
// ];

const Collection = () => {
  const [hoveredId, setHoveredId] = useState(null);

  const {data: collections=[]} = useQuery({
    queryKey: 'collections',
    queryFn: async() => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/category`);
      return response.data;
    }
})
  return (
    <div className="px-4 py-8">
    <h1 className="text-4xl font-bold text-center mb-8">Collections</h1>
  
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {collections.slice(0, 4).map((collection) => (
        <div
          key={collection._id}
          className="relative rounded-lg overflow-hidden group"
          onMouseEnter={() => setHoveredId(collection._id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Image container with hover effect */}
          <div className="aspect-w-4 aspect-h-3 relative transition-transform group-hover:scale-105 group-hover:opacity-90">
            <img
              src={collection.image}
              alt={collection.name}
              className="w-full h-full object-cover transform transition-transform duration-300"
            />
            
            {/* Black overlay with opacity on hover */}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
  
            {/* Overlay with title */}
            <div className="absolute inset-0 flex items-end">
              <h3 className="text-white text-xl font-semibold p-4">
                {collection.name}
              </h3>
            </div>
  
            {/* Plus button that appears on hover */}
            {hoveredId === collection._id && (
              <div className="absolute inset-0 flex justify-center items-center">
                <button className="bg-black rounded-full p-4 shadow-lg">
                  <BiPlus className="w-8 h-8 text-gray-800" />
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default Collection;
