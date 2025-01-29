import { configureStore } from "@reduxjs/toolkit";
import { adminReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { wishlistReducer } from "./reducers/wishlistReducer";

const userInfoLocalStorage = localStorage.getItem('userAccount')? JSON.parse(localStorage.getItem('userAccount')) : null;
const adminInfoLocalStorage = localStorage.getItem('adminAccount')? JSON.parse(localStorage.getItem('adminAccount')) : null;

const initialState = {
    user: { userInfo: userInfoLocalStorage },
    admin: { adminInfo: adminInfoLocalStorage },
  };


  // Configure the store with all reducers and initial state
const store = configureStore({
    reducer: {
    //   cart: cartReducer,
    //   wishlist: wishlistReducer,
      user: userReducer,
      admin: adminReducer,
      cart: cartReducer,
      wishlist: wishlistReducer,
    },
    preloadedState: initialState, // Set the initial state
  });
  
  export default store;