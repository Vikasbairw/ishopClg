import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Context = createContext();
const MainContext = (props) => {
  
  const notify = (msg, type) => toast(msg, { type });
  const [categoryApiFetch, SetcategoryApiFetch] = useState("");
  const [category_base_url, Setcategory_base_url] = useState("");
  const [product, Setproduct] = useState({});
  const [pro_url, Set_pro_baseurl] = useState();
  const [colordata, Setcolordata] = useState();
  const [admin, setadmin] = useState(null);

  //fetch api of the category
  useEffect(() => {
    axios
      .get("http://localhost:5000/category/")
      .then((success) => {
        SetcategoryApiFetch(success.data);
        Setcategory_base_url(success.data.base_url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //category end
  //product api fetch
  function productread() {
    axios
      .get("http://localhost:5000/product")
      .then((success) => {
        Setproduct(success.data);
        Set_pro_baseurl(success.data.base_url);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function colorread() {
    axios.get("http://localhost:5000/color").then(
      (success) => {
        Setcolordata(success.data)
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
  }
  
  useEffect(() => {
    productread();
    colorread();
  }, []);
  //end product api fetch
  return (
    <Context.Provider
      value={{
        notify,
        categoryApiFetch,
        product,
        pro_url,
        colordata,
        productread,
        category_base_url,
        admin, setadmin,
      }}
    >
      {props.children}
      <ToastContainer />
    </Context.Provider>
  );
};

export default MainContext;
export { Context };
