import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../store/actions/wishlistAction";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


const ProductCard = ({product}) => {


    const [click, setClick] = useState(false);
    const dispatch = useDispatch();
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
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md group">
        <div className="relative">
          {/* Product Image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badges for New and Discount */}
          <div className="absolute top-2 left-2 flex gap-2">
            {product?.isNew && (
              <span className="bg-white px-2 py-1 text-xs rounded">New</span>
            )}
            {product?.discount && (
              <span className="bg-red-500 text-white px-2 py-1 text-xs rounded">
                {product?.discount}
              </span>
            )}
          </div>

          {/* Interactive Buttons */}
          <div className="absolute top-2 right-2 flex gap-2">
            <button onClick={()=>{handleWishlistToggle(product)}} className={`bg-white p-2 rounded-full shadow hover:bg-gray-100 ${click ? 'text-red-500' : 'text-gray-500'}`}>
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
          <Link to={`/productdetails/${product._id}`}>
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
              Tk {product?.price.toLocaleString()}
            </span>
            {product?.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                Tk {product?.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    );
};

export default ProductCard;