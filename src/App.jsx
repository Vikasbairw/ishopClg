import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter, useParams } from "react-router-dom";
import Mainwebsite from "./Page/Website/Mainwebsite";
import Store from "./Page/Website/Store";
import Home from "./Page/Website/Home";
import AdminMain from "./Page/Adome/AdminMain";
import CategoryAdd from "./Page/Adome/Category/Add";
import CategoryView from "./Page/Adome/Category/View";
import Deshborad from "./Page/Adome/Deshborad";
import Editcatgeory from "./Page/Adome/Category/Edit";
import EditProduct from "./Page/Adome/Product/Edit";
import ProductAdd from "./Page/Adome/Product/Add";
import ProductView from "./Page/Adome/Product/View";
import ColorAdd from "./Page/Adome/Color/Add";
import ColorView from "./Page/Adome/Color/View";
import Editcolor from "./Page/Adome/Color/Edit";
import ProductShow from "./Page/Website/ProductShow";
import Profilepage from "./Page/Website/Profilepage";
import Login from './Page/Adome/Login'
import Iphone from "./Page/Website/Iphone";
import Laptop from "./Page/Website/Laptop";
import Loging from "./Page/Profiles/Login";
import Singup from "./Page/Profiles/Singup";
import Cart from "./Page/Website/Cart";
import CheckOut from "./Page/Website/CheckOut";
import { useDispatch } from "react-redux";
import { getCategory } from "./Page/Website/reduxer/Category";
import { getProduct } from "./Page/Website/reduxer/Product";
import { getCartProduct } from "./Page/Website/reduxer/Cart";
import { GetUserData } from "./Page/Website/reduxer/User";
import AdminUser from "./Page/Adome/AdminUser";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainwebsite />,
    children: [
      {
        path: "",
        element: <Home />,
      }
      ,{
        path:"/iphone",
        element:<Iphone/>
      },
      {
        path:"/laptop",
        element:<Laptop/>
      },
      {
        path: "/store/product/:product_slug?",
        element: <ProductShow />,
      },
      {
        path: "/store/:slug?",
        element: <Store />,
      }
    ],
  },
  {
    path:"/login",
    element:<Loging/>
  },
  {
    path:"/singup",
    element:<Singup/>
  },{
    path:"/cart",
    element:<Cart/>
  },{
path:"/checkout",
element:<CheckOut/>
  },
  {
path:"/profile",
element:<Profilepage/>
  },
  {
    path: "/admin",
    element: <AdminMain />,
    children: [
      {
        path: "",
        element: <Deshborad />,
      },
      {
        path: "category",
        element: <CategoryView />,
      },
      {
        path: "category/add",
        element: <CategoryAdd />,
      },
      {
        path: "category/edit/:id",
        element: <Editcatgeory />,
      },
      {
        path: "product",
        element: <ProductView />,
      },
      {
        path: "product/add",
        element: <ProductAdd />,
      },

      {
        path: "product/edit/:id",
        element: <EditProduct />,
      },
      {
        path: "color/",
        element: <ColorView />,
      },
      {
        path: "color/add",
        element: <ColorAdd />,
      },

      {
        path: "color/edit/:id",
        element: <Editcolor />,
      }
    ],
    
  },
  {
    path:"admin/login",
    element:<Login/>
  },{
    path:"admin/users",
    element:<AdminUser/>
  }
]);



export default function App() {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getCategory());
    dispatch(getProduct())
    dispatch(getCartProduct())
    dispatch(GetUserData());
  },[]);
  return (

    <div className="overflow-hidde">
      <RouterProvider router={router} />
 
    </div>
  );
}
