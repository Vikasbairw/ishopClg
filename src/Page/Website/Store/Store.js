import { configureStore } from "@reduxjs/toolkit";
import Category from "../reduxer/Category";
import Product from "../reduxer/Product";
import Cart from "../reduxer/Cart";
import User from "../reduxer/User";

const store = configureStore({
  reducer: {
    category: Category,
    product:Product,
    Cart:Cart,
    User:User
  },
});
export default store;
