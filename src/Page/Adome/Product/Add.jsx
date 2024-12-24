import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Context } from "../../MainContext";
import { useLocation } from "react-router-dom";

const Add = () => {
  const { notify } = useContext(Context);
  const { categoryApiFetch,colordata } = useContext(Context);
const location = useLocation();
const [fetch,Setfetch] =useState("");
 
useEffect(
  ()=>{
    Setfetch("hello");
    
  },[location]
)
console.log(fetch,"dsfds");
  const inpRef = useRef();
  const priceRef = useRef();
  const discountRef = useRef();
  const finalRef = useRef();

  function callvalue() {
    const price = priceRef.current.value;
    const discount = discountRef.current.value;
    if (price != "" || discount != "") {
      const final = price - price * (discount / 100);
      finalRef.current.value = final;
    }
  }
  const genratorslug = (e) => {
    const inputtittle = e.target.value;
    const slug = inputtittle.toLowerCase().replace(/ /g, "-");
    inpRef.current.value = slug;
  };

  const SumbitHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    
    formdata.append("name", e.target.name.value);
    formdata.append("slug", e.target.slug.value);
    formdata.append("category_id", e.target.category.value);
    formdata.append("category_sub_id", e.target.categorysub.value);
    formdata.append("color_id", e.target.color.value);
    formdata.append("price", e.target.price.value);
    formdata.append("discount", e.target.discount.value);
    formdata.append("final", e.target.final.value);
    formdata.append("prod_describtion",e.target.product_describtion.value)
    formdata.append("image", e.target.images.files[0]);
    axios
      .post("http://localhost:5000/product/create", formdata)
      .then((success) => {
        if (success.data.status == true) {
          notify(success.data.msg, "success");
          e.target.reset();
        } else {
          notify(success.data.msg, "error");
        }
      })
      .catch((err) => {
        notify(err.data.msg, "error");
      });
  };

  return (
    <div className="shadow h-full p-4 m-3">
      <div className="text-xl font-bold">Product Add</div>
      <hr className="my-3" />
      <form
        className="mx-auto"
        onSubmit={SumbitHandler}
        encType="multipart/from-data"
      >
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={genratorslug}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="images"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Slug
          </label>
          <input
            type="text"
            ref={inpRef}
            name="slug"
            id="slug-genrater"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            readOnly
          />
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="mb-5 cols-1">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option disabled selected>
                select Category
              </option>
              {categoryApiFetch?.data?.map((d) => {
                return <option value={d._id} key={d._id}>{d.name}</option>;
              })}
            </select>
          </div>
          <div className="mb-5 cols-1">
            <label
              htmlFor="subcategory"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Category_Sub
            </label>
            <select
              name="categorysub"
              id="subcategory"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option disabled selected>
                select Sub Category
              </option>
              {categoryApiFetch?.data?.map((d) => {
                return <option value={d._id} key={d._id}>{d.subcategory}</option>;
              })}
            </select>
          </div>
          <div className="mb-5 ">
            <label
              htmlFor="color"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Color
            </label>
            <select
              name="color"
              id="color"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option disabled selected>
                select Color
                
              </option>
              {colordata?.data?.map((d) => {
                return <option value={d._id} key={d._id}>{d.name}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="mb-5">
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Price
            </label>
            <input
              type="text"
           
              id="price"
              name="price"
              ref={priceRef}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="discount"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Discount
            </label>
            <input
              type="text"  
               onChange={callvalue}
              id="discount"
              name="discount"
              ref={discountRef}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
   
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="final"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Final
            </label>
            <input
              type="text"
              id="final"
              name="final"
              ref={finalRef}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
  
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="text-sm font-medium text-gray-900 mb-2">Product Describtion</label>
          <textarea className="w-[100%] border rounded" name="product_describtion">

          </textarea>
        </div>
        <div className="mb-5">
          <label
            htmlFor="slug-genrater"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Upload Image
          </label>
          <input
            type="file"
            name="image"
            id="images"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Add;
