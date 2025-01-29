import React, { useEffect, useState } from 'react';
import { CarTaxiFront, Heart, ShoppingBag } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../store/actions/wishlistAction';
import toast from 'react-hot-toast';
import { addTocart } from '../../store/actions/cartAction';

// const products = {
//   bestSeller: [
//     {
//       id: 1,
//       name: 'Abdul Samad Al Qurashi Safari Blue 75ml Extrait De Parfum',
//       price: 10220.00,
//       originalPrice: 980.00,
//       image: '/placeholder.svg?height=300&width=300',
//       status: ['Hot', 'Sold Out'],
//     },
//     // Add more best seller products...
//   ],
//   newArrivals: [
//     {
//       id: 2,
//       name: 'Acqua Di Gio 200ml Edt For Men',
//       price: 7999.00,
//       originalPrice: 9999.00,
//       image: '/placeholder.svg?height=300&width=300',
//       status: ['Sold Out'],
//     },
//     {
//       id: 3,
//       name: 'Afnan 9PM Deodorant Spray 250ml',
//       price: 735.00,
//       originalPrice: 1500.00,
//       image: '/placeholder.svg?height=300&width=300',
//       status: ['Sale'],
//     },
//     {
//       id: 4,
//       name: 'Afnan Dehn Al Oudh Abiyad Attar 20ml For Men And Women',
//       price: 1199.00,
//       originalPrice: 2260.00,
//       image: '/placeholder.svg?height=300&width=300',
//       status: ['Hot', 'Sale'],
//     },
//     // Add more new arrival products...
//   ],
// };

export const ProductCard = ({ product }) => {
  const [isWishlist, setIsWishlist] = useState(false);
  const [click, setClick] = useState(false);
  const [isCart, setCart] = useState(false);
  const dispatch = useDispatch();
  const {cart} = useSelector((state)=>state.cart)
  const {wishlist} = useSelector((state)=>state.wishlist)

  useEffect(() => {
    const isExistInWishList = wishlist.find((item) => item._id === product._id);
    if (isExistInWishList) {
      setIsWishlist(true);
    }else{
      setIsWishlist(false);
    }
  }, [wishlist]);

  useEffect(() => {
    const isExistInCart = cart.find((item) => item._id === product._id);
    if (isExistInCart) {
      setCart(true);
    }else{
      setCart(false);
    }
  }, [cart]);

  const handleWishlistToggle = (data) => {
      
      if (click) {
        dispatch(removeFromWishlist(data));
        toast.error("Product removed from wishlist");
      } else {
        dispatch(addToWishlist(data));
       
        toast.success("Product added to wishlist");
      }
      setClick(!click);
    };

    const handleAddToCart = (id) => {
      const isItemExists = cart.find((item) => item._id === id);
      if (isItemExists) {
        setCart(true);
        toast.error("Item already exists in the cart");
      } else {
        dispatch(addTocart(product));
        setCart(true);
        toast.success("Item added to cart");
      }
    };

  return (
    <div className="relative group">
      <div className="relative">
        <img 
          src={product?.images[0] || "/placeholder.svg"} 
          alt={product?.name} 
          className="w-full h-auto aspect-square object-cover"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
        
        {product?.hotSale && (
          <span className="text-xs font-semibold px-2 py-1 text-white bg-red-500"> 

            Hot
          </span>
        )}
        {product?.isSale && (
          <span className="text-xs font-semibold px-2 py-1 text-white bg-green-500">
            Sale
          </span>
        )}
        {product?.isNew && (
          <span className="text-xs font-semibold px-2 py-1 text-white bg-green-500">
            New
          </span>
        )}
       
        </div>
        <button 
          onClick={()=>{handleAddToCart(product._id)}}
          className="absolute top-12 right-2 p-2 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ShoppingBag
            className={`w-5 h-5 ${isCart ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>
        <button 
          onClick={()=>{handleWishlistToggle(product)}}
          className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart 
            className={`w-5 h-5 ${isWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
          ৳{product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ৳{product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <button  className="w-full py-2 text-sm font-medium text-center border border-gray-300 rounded hover:bg-gray-50 transition-colors">
          <Link to={`/productdetails/${product._id}`}>Learn More</Link>
        </button>
      </div>
    </div>
  );
};

const ProductListing = () => {
  const [activeTab, setActiveTab] = useState('bestSeller');
  const {data:products=[]} = useQuery({
    queryKey: 'products',
    queryFn: async () => {
     const response = await axios.get(`${import.meta.env.VITE_API_URL}/customer/products`);
     return response.data;
    }
  })

  const filteredProducts = products.filter((product) =>
    activeTab === 'bestSeller' ? product.bestSeller : product.isNew
  );
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('bestSeller')}
              className={`pb-4 text-sm font-medium border-b-2 ${
                activeTab === 'bestSeller'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              BEST SELLER
            </button>
            <button
              onClick={() => setActiveTab('newArrivals')}
              className={`pb-4 text-sm font-medium border-b-2 ${
                activeTab === 'newArrivals'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              NEW ARRIVALS
            </button>
          </nav>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {filteredProducts.length > 0 && (
          filteredProducts.map((product) => <ProductCard key={product._id} product={product} />)
        )}
      </div>

      {filteredProducts.length === 0 && (
        <div className="flex items-center justify-center h-20">
          <MdOutlineProductionQuantityLimits className="w-24 h-24 text-gray-300" />
          <p className="text-lg font-medium text-gray-500">
            No products found
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductListing;