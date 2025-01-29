import React, { useState } from 'react';
 

const officeProducts = [
  {
    id: 1,
    title: "Boss Table",
    image: "https://i.postimg.cc/jq73M64m/Boss-Table-785x.jpg",
    gridClass: "col-span-2 row-span-2"
  },
  {
    id: 2,
    title: "CEO Desk",
    image: "https://i.postimg.cc/vmhv57P3/10c4ed96-5200-4514-999d-eca8a87e09cf.jpg",
  },
  {
    id: 3,
    title: "WorkStation",
    image: "https://i.postimg.cc/wMycKC9G/2ae7f078-0899-4cc5-ae08-a8ee33dc1930.jpg",
  },
  {
    id: 4,
    title: "Executive Desk",
    image: "https://i.postimg.cc/y8qnK8gX/63257b1f-05f0-4e86-a6d9-2229d51425cb.jpg",
  },
  {
    id: 5,
    title: "Conference Table",
    image: "https://i.postimg.cc/qRZX5JHK/8c0e6a04-d906-465e-8d0f-fa6e9ee494bb.jpg",
  }
];

const OfficePopularChoice = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="px-4 py-8">
    <h1 className="text-3xl font-bold text-center mb-8">Office Popular Choice</h1>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {officeProducts.map((product) => (
        <div
          key={product.id}
          className={`relative rounded-lg overflow-hidden group ${
            product.id === 1 ? 'md:col-span-2 md:row-span-2' : ''
          }`}
          onMouseEnter={() => setHoveredId(product.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div className="relative h-full">
            {/* Image with hover effect */}
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            
            {/* Dark overlay with title */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
              <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold">
                {product.title}
              </h3>
            </div>
  
            {/* Optional: Details on hover */}
         
          </div>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default OfficePopularChoice;