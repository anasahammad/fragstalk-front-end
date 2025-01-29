import { useState } from "react";

import { BsCartPlus } from "react-icons/bs";


import { PiTrashFill } from "react-icons/pi";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../store/actions/wishlistAction";
import { addTocart } from "../../store/actions/cartAction";

const WishlistSingle = ({ data, setOpenWishlist }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const [value, setValue] = useState(1);

  const totalPrice = data?.price * value;

  // cross icon handler
  const handleCrossIcon = (data) => {
    dispatch(removeFromWishlist(data));
  };

  // handle add to cart
  const handleAddToCart = (id) => {
    const isItemExists = cart.find((item) => item._id === id);
    if (isItemExists) {
      toast.error("Item already exists in the cart");
    } else {
      dispatch(addTocart(data));
      toast.success("Item added to cart");
      dispatch(removeFromWishlist(data));
    }
  }
  return (
    <div className="border-b p-4 cursor-pointer  bg-gray-200 group ">
      <div className="w-full items-center flex ">
        <PiTrashFill
          className="cursor-pointer"
          size={20}
          onClick={() => handleCrossIcon(data)}
        />
        <img
          src={data?.images[0]}
          alt="product/image"
          className="w-[80px] h-[80px] ml-4 object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
        />

        <div className="pl-2">
        <h1 className="lg:text-sm text-xs">
          {data.name.length > 30 ? `${data.name.slice(0, 30)}...` : data.name}
        </h1>

          <h4 className="font-[600] font-Roboto text-[16px] pt-1 text-[#000]">
            ৳ {totalPrice}
          </h4>
        </div>

        <div className="ml-auto mr-1">
          <BsCartPlus
            size={20}
            title="Add to cart"
            className="cursor-pointer"
            onClick={()=> handleAddToCart(data._id)}
          />
        </div>
      </div>
      {/* toast message */}
      
    </div>
  );
};

export default WishlistSingle;
