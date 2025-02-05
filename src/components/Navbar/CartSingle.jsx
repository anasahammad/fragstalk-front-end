import  { useState } from "react";

import { HiMinus, HiPlus } from "react-icons/hi";


import { useDispatch } from "react-redux";

import { RiDeleteBin2Fill } from "react-icons/ri";
import { removeFromCart } from "../../store/actions/cartAction";
import toast from "react-hot-toast";

const CartSingle = ({ data, quantityChangeHanlder }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(data.qty || 1);

  const totalPrice = data.price * value;

  // increment function for increment button
  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateData = { ...data, qty: value + 1 };
      quantityChangeHanlder(updateData);
    }
  };

  // decrement function for decrement button
  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHanlder(updateData);
  };

  // cross icon handler
  const handleCrossIcon = (data) => {
    dispatch(removeFromCart(data));
  };

  return (
    <div className="border-b p-4 cursor-pointer  bg-gray-200">
      <div className="w-full items-center flex">
        <div>
          <div
            className={`bg-[#000] border flex items-center border-[#e4434373] rounded-full w-[25px] h-[25px] cursor-pointer justify-center mb-1`}
            onClick={() => increment(data)}>
            <HiPlus size={18} color="#fff" />
          </div>

          <span className="pl-[10px] select-none">{data?.qty}</span>

          <div
            className="bg-[#a7abb148] rounded-full w-[25px] h-[25px] flex items-center cursor-pointer justify-center mt-1"
            onClick={() => decrement(data)}>
            <HiMinus size={18} color="#7d879c" />
          </div>
        </div>

        <div className="select-none">
          <img
            src={data.images[0]}
            
            alt="product/image"
            className="w-[80px] h-[80px] ml-4 object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>
        <div className="pl-5 select-none">
        <h1 className="lg:text-sm text-xs">
          {data.name.length > 24 ? `${data.name.slice(0, 24)}...` : data.name}
        </h1>
          <h4 className="text-[#00000082] font-[400] text-[15px]">
            {data.price} * {value}
          </h4>

          <h4 className="font-[600] font-Roboto text-[16px] pt-1 text-[#000]">
          ৳{totalPrice}
          </h4>
        </div>

        <RiDeleteBin2Fill
          onClick={() => handleCrossIcon(data)}
          size={18}
          className="cursor-pointer ml-auto mr-1 "
        />
      </div>
      {/* toast message */}
      
    </div>
  );
};

export default CartSingle;
