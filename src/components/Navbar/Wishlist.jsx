
import { RxCross1 } from "react-icons/rx";
import { AiOutlineHeart } from "react-icons/ai";



import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import WishlistSingle from "./WishlistSingle";
import useClickOutside from "../../hooks/useClickOutside";

const Wishlist = ({ setOpenWishlist, openWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
 console.log(wishlist)

 const WishlistRef = useClickOutside(() => {
  if (openWishlist) {
    setOpenWishlist(false);
  }
});
  return (
    <div className="w-full fixed h-screen top-0 left-0 z-[1000] bg-[#0000006b]">
      <motion.div
      ref={WishlistRef}
        initial={{ opacity: 0, x: 400 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 400 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 right-0 h-full  w-[80%] lg:w-[30%]  flex flex-col justify-between shadow-sm  bg-white text-gray-700 overflow-y-scroll"
        style={{ scrollbarWidth: "none" }}>
        {wishlist && wishlist.length === 0 ? (
          <div className="flex w-full h-screen justify-center items-center">
            <div className="flex   fixed top-3 right-3 pr-3 pt-3 justify-end w-full">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h5 className=" ">Wishlist items is empty!</h5>
          </div>
        ) : (
          <div>

<div className="flex justify-between items-center">


{/* items length */}
  {/* items length */}
  <div className={`flex items-center p-4`}>
              <AiOutlineHeart size={25} />
              <h5 className="pl-3 font-[500] text-[17px]">
                {wishlist?.length} items
              </h5>
            </div>
<div className="flex w-8 h-8 rounded-full text-[#8A067D] bg-gray-200 shadow-lg p-1 mr-4 cursor-pointer justify-center items-center ">
  <RxCross1 size={16} onClick={() => setOpenWishlist(false)} />
</div>
</div>
           
          

            {/* single cart item */}
         
            <div className="w-full border-t space-y-2">
              {wishlist?.map((item, index) => (
                <WishlistSingle
                  data={item}
                  key={index}
                  setOpenWishlist={setOpenWishlist}
                />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Wishlist;
