import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Share2,
  Clock,
  ArrowUp,
  Heart,
  MessagesSquare,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules"; 
import { FaShieldAlt, FaHeadset, FaCreditCard, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ScrollToTop from "../../hooks/ScrollToTop";
import { useNavigate, useParams } from 'react-router-dom';
import RelatedProduct from "../RelatedProduct/RelatedProduct";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../store/actions/wishlistAction";
import toast from "react-hot-toast";
import { addTocart } from "../../store/actions/cartAction";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ProductDetails = () => {
  
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  const {cart} = useSelector((state)=>state.cart)
  const { id } = useParams();
  const [orderProduct, setOrderProduct] = useState(null);
  // const products = [
  //   {
  //     id: 1,
  //     name: 'Alexandria Cloth Organizer - BFC401',
  //     price: 13500.00,
  //     image: 'https://i.postimg.cc/wMycKC9G/2ae7f078-0899-4cc5-ae08-a8ee33dc1930.jpg',
  //     isNew: true,
  //   },
  //   {
  //     id: 2,
  //     name: 'Tudor Wardrobe - BFC403',
  //     price: 14400.00,
  //     image: 'https://i.postimg.cc/mDryjcJR/326b5366-face-4981-b089-938e98643dbb.jpg',
  //     isNew: true,
  //   },
  //   {
  //     id: 3,
  //     name: 'Florentine Wardrobe - BFC402',
  //     price: 16500.00,
  //     originalPrice: 17500.00,
  //     image: 'https://i.postimg.cc/y8qnK8gX/63257b1f-05f0-4e86-a6d9-2229d51425cb.jpg',
  //     isNew: true,
  //     discount: '-6%',
  //   },
  //   {
  //     id: 4,
  //     name: 'CPU Cruiser - BFA301',
  //     price: 899.00,
  //     image: 'https://i.postimg.cc/bvpTGVRZ/64cc0f48-7c74-4cee-b050-84f34e341002.jpg',
  //     isNew: true,
  //   },
  //   {
  //     id: 5,
  //     name: 'Calmness Study Table - BFT012',
  //     price: 9000.00,
  //     image: 'https://i.postimg.cc/zDV9X3B9/8a33a04a-4040-4fa8-a3e3-9587496afefd.jpg',
  //     isNew: true,
  //   },
  // ].concat(Array(10).fill().map((_, i) => ({
  //   id: i + 6,
  //   name: `Product ${i + 6}`,
  //   price: 9999.00,
  //   image: [
  //     'https://i.postimg.cc/qRZX5JHK/8c0e6a04-d906-465e-8d0f-fa6e9ee494bb.jpg',
  //     'https://i.postimg.cc/PrvK0wx5/a47da85e-eee0-4cb9-99a3-bcb2ee2da0f4.jpg',
  //     'https://i.postimg.cc/6qgcy9HK/b8ea5777-1c18-46f4-b7af-e1b61feb8fe2.jpg',
  //     'https://i.postimg.cc/rwSjw256/c3f2925d-0515-4fc9-ba23-8c9300305314.jpg',
  //     'https://i.postimg.cc/90r1m4Y1/c9aac6fa-7c7d-4a63-84ee-fde978fcdd0d.jpg',
  //     'https://i.postimg.cc/v8N3PzGK/d027d112-c56a-439a-a382-8615c84c1c75.jpg',
  //     'https://i.postimg.cc/nzd0fKBC/f4cef422-b87b-44d0-9551-746c0523c1b3.jpg',
  //   ][i % 7], // Rotates through the image array
  //   isNew: true,
  // })));
  
  const {data: products=[]} = useQuery({
    queryKey: 'products',
    queryFn: async() => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/customer/products`);
    
      return response.data;
    }
})
const product = products.find((item) => item._id === id);

const [quantity, setQuantity] = useState(product?.qty || 1);

  const handleBuyProduct = () => {  
    navigate("/checkout", { state: { product: [orderProduct] } });
  };
  console.log("product",product);
  if (!product) {
    return <div>Product not found</div>;
  }
 
    const features = [
      {
        icon: <FaShieldAlt className="text-5xl text-gray-700 mb-4" />,
        title: "Returns & Warranty",
        description:
          "Buy with confidence! Our products come with a warranty and easy return policy.",
      },
      {
        icon: <FaHeadset className="text-5xl text-gray-700 mb-4" />,
        title: "Customer Support",
        description:
          "Get help anytime! Our friendly customer support team is here for you.",
      },
      {
        icon: <FaCreditCard className="text-5xl text-gray-700 mb-4" />,
        title: "EMI Available",
        description:
          "Buy now, pay later! Easy monthly installments for up to 12 months on your credit card.",
      },
    ];
 

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
      toast.error("Item already exists in the cart");
    } else {
      dispatch(addTocart(product));
      toast.success("Item added to cart");
    }
  };


  const downloadImage = (url, filename) => {
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(() => toast.error("ছবি ডাউনলোড করতে সমস্যা হয়েছে!"));
  };
  

  const handleIncrement = () => {
    if(product.stock > quantity){
      setQuantity(quantity + 1);
      const updatedData = { ...product, qty: quantity + 1 };
      setOrderProduct(updatedData);
      // toast.success("Quantity updated");
    } else{
      toast.error("Out of stock");
    }
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      const updatedData = { ...product, qty: quantity - 1 };
      toast.success("Quantity updated");
      setOrderProduct(updatedData);
    } else {
      toast.error("Minimum quantity reached");
    }
  }
  return (
    <ScrollToTop>
    <div className="  p-4 bg-white mt-12">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Product Image */}
        
<div className="relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]} 
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 1000 }}
              className="mySwiper"
            >
              {product.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="w-full rounded-lg"
                  />

<div className="absolute top-4 right-4 flex gap-2">
            <button className="p-2 bg-white rounded-full shadow-md">
              <Share2 className="w-5 h-5" />
            </button>
            <button onClick={() => downloadImage(image, `${product?.name}.jpg`)} className="p-2 bg-white rounded-full shadow-md">
            <ArrowUp className="w-5 h-5" />
            </button>
          </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
  
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">
               {product.name}
            </h1>
            <p className="text-gray-600">SKU: {product.sku}</p>
            {product.originalPrice? <div className="flex items-center gap-2 text-xl mt-2">
            <p className=" text-gray-500 line-through">৳{product.price}</p>
            <p className=" text-red">৳{product.originalPrice}</p>
            </div> : <p className="text-red-400  ">৳{product.price}</p>}
            
          </div>
            {/* details */}

            <div>
            <h1 className="text-base  mb-2">{product.description}
            </h1>
            </div>
          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => handleDecrement()}
                className="px-3 py-1 border-r hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button
                onClick={() => handleIncrement()}
                className="px-3 py-1 border-l hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Wishlist Button */}
          <button
            
            onClick={()=>{handleWishlistToggle(product)}}
            className={`flex items-center gap-2 text-sm ${
              click ? "text-red-500" : "text-gray-600"
            }`}
          >
            <Heart className="w-5 h-5" />
            {click ? "Added to Wishlist" : "Add to Wishlist"}
          </button>

          {/* Terms and Conditions */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree with <span className="text-teal-500 underline">Terms & Conditions</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
            onClick={() => handleAddToCart(product.id)}
              className={`w-full py-3 rounded-md text-white ${
                agreed ? "bg-black hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!agreed}
            >
              Add To Cart
            </button>
            <button
            onClick={() => handleBuyProduct()}
              className={`w-full border border-black py-3 rounded-md ${
                agreed
                  ? "hover:bg-gray-50"
                  : "bg-gray-100 cursor-not-allowed text-gray-500"
              }`}
              disabled={!agreed}
            >
              Buy It Now
            </button>
          </div>

          {/* Additional Features */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <MessagesSquare className="w-4 h-4" />
            <span>193 customers are viewing this product</span>
          </div>

          {/* Shipping Information */}
          <div className="border-t pt-4">
            <div className="flex items-center gap-2 text-gray-700 mb-2">
              <Clock className="w-5 h-5" />
              <span className="font-medium">Shipping Time</span>
            </div>
            <p className="text-sm text-gray-600">
              Standard delivery time is between 3 to 10 working days for regular
              orders depending on stock availability and shipping location.
            </p>
          </div>

         

          {/* Additional Information */}
          <div className="border-t pt-4">
            <button
              onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
              className="flex justify-between items-center w-full py-2"
            >
              <span className="font-medium">Description</span>
              {showAdditionalInfo ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            {showAdditionalInfo && (
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Dimensions:</h3>
                   {product.details.map(item=> <p key={item.key}>{item.key}</p>)}
                  
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Materials:</h3>
                   

{product.details.map(item=> <p key={item.key}>{item.value}</p>)}
                  </div>
                </div>

                
              </div>
            )}
          </div>

           {/* Description Section */}
           <div className="border-t pt-4">
            <button
              onClick={() => setShowDescription(!showDescription)}
              className="flex justify-between items-center w-full py-2"
            >
              <span className="font-medium">Additional Information</span>
              {showDescription ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            {showDescription && (
              <div className="mt-4">
                      
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Name:</h3>
                   {product.additional.map(item=> <p key={item.key}>{item.key}</p>)}
                  
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Value:</h3>
                   

{product.additional.map(item=> <p key={item.key}>{item.value}</p>)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    <div className="py-16   relative">
        <div className=" px-4">
        <h2 className="text-3xl text-center font-bold"> Why Us?</h2>
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            modules={[Navigation]} // Correctly use the Navigation module
            className="mySwiper"
          >  
            {features.map((feature, index) => (
              <SwiperSlide key={index}>
                <div className="flex bg-white flex-col items-center justify-center rounded-lg shadow-lg p-8 text-center hover:scale-105 transition-transform duration-300 hover:bg-gray-50">
                  {feature.icon}
                  <h3 className="text-lg font-bold text-gray-800 mb-4 mt-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev-custom absolute top-1/2 left-8 transform -translate-y-1/2 text-gray-700 text-2xl cursor-pointer z-10">
            <FaArrowLeft />
          </div>
          <div className="swiper-button-next-custom absolute top-1/2 right-8 transform -translate-y-1/2 text-gray-700 text-2xl cursor-pointer z-10">
            <FaArrowRight />
          </div>
        </div>
      </div>
  <RelatedProduct/>
    </ScrollToTop>
  );
};

export default ProductDetails;
