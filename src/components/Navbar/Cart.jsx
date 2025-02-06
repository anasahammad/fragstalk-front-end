import React from 'react';
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CartSingle from "./CartSingle";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../store/actions/cartAction";
import useClickOutside from '../../hooks/useClickOutside';

const Cart = ({ setOpenCart, openCart }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart } = useSelector((state) => state.cart);

  const totalPrice = cart.reduce((acc, item) => {
    const quantity = item.qty ? item.qty : 1;
    const price = item.price;
    return acc + price * quantity;
  }, 0);

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };

  const handleBuyNow = () => {
    setOpenCart(false);
    navigate("/checkout", { state: { product: cart } });
  };

  // Use the custom hook
  const cartRef = useClickOutside(() => {
    if (openCart) {
      setOpenCart(false);
    }
  });
  
  return (
    <div className="w-full fixed h-screen left-0 top-0 z-[1000] bg-[#0000006b]">
      <motion.div
        ref={cartRef}
        initial={{ opacity: 0, x: 400 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 400 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 right-0 h-full w-[80%] lg:w-[30%] flex flex-col justify-between bg-white text-gray-700 shadow-lg overflow-y-scroll scrollbar-hide"
      >
        {/* Header */}
        <div className="flex justify-between items-center py-2 px-4 border-b">
          <h2 className="text-base font-medium">
            Cart Items ({cart.length})
          </h2>
          <RxCross1
            size={16}
            color="red"
            className="cursor-pointer"
            onClick={() => setOpenCart(false)}
          />
        </div>

        {/* Cart Content */}
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-2xl font-medium text-gray-600">
              Your cart is empty!
            </p>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Cart Items */}
            <div className="flex-1 space-y-1 overflow-y-scroll">
              {cart.map((item, index) => (
                <CartSingle
                  key={index}
                  data={item}
                  quantityChangeHandler={quantityChangeHandler}
                />
              ))}
            </div>

            {/* Checkout Button */}
            <div className="p-4">
              <button
                onClick={handleBuyNow}
                className="w-full h-[35px] bg-black text-white font-medium text-base rounded-[5px]"
              >
                Checkout Now (৳ {totalPrice})
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Cart;