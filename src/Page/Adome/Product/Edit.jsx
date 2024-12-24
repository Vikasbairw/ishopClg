import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Context } from "../../MainContext";
import { useNavigate, useParams } from "react-router-dom";


const Editcategory = () => {
const nevigate=useNavigate()
  const [Edit, SetEdit] = useState({ name: "", slug: "", image: "" });
  const { categoryApiFetch,colordata } = useContext(Context);
const [baseurl,setbaseurl]=useState("")
  const { notify } = useContext(Context);
  const inpRef = useRef();
  const { id } = useParams();
  const discountRef=useRef();
  const priceRef=useRef();

  useEffect(() => {
    axios
      .get("http://localhost:5000/product/" + id)
      .then((success) => {
       
        if (success.data.status == 1) {
          setbaseurl(success.data.base_url)
          SetEdit(success.data.data);
         
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const genratorslug = (e) => {
    // const inputtittle = e.target.value;
    // console.log(inputtittle)
    const slug = e.toLowerCase().replace(/ /g, "-");
    return slug;
  };
  function callvalue() {
    const price = priceRef.current.value;
    const discount = discountRef.current.value;
    if (price != "" || discount != "") {
      const final = price - price * (discount / 100);
    return final;
    }
  }

  const SumbitHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", e.target.name.value);
    formdata.append("slug", e.target.slug.value);
    formdata.append("category_id", e.target.category.value);
    formdata.append("color_id", e.target.color.value);
    formdata.append("price", e.target.price.value);
    formdata.append("discount", e.target.discount.value);
    formdata.append("final", e.target.final.value);
    formdata.append("image", e.target.images.files[0]);
    // console.log(formdata);
    axios
      .patch("http://localhost:5000/product/edit/" + id, formdata)
      .then((success) => {
        if (success.data.status == 1) {
          notify(success.data.msg, "success");
          e.target.reset();
        } else {
          notify(success.data.msg, "error");
        }
      })
      .catch((err) => {
        console.log(err)
        notify(err.data.msg, "error");
      });
  };

  return (
    <div className="shadow  p-4 m-3">
      <div className="text-xl font-bold">Edit  Product  </div>
      <hr className="my-3"></hr>
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
            {" "}
            Name{" "}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => {
              SetEdit({
                ...Edit,
                name: e.target.value,
                slug: genratorslug(e.target.value),
              });
            }}
            value={Edit.name}
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
            {" "}
            Slug{" "}
          </label>
          <input
            type="text"
            value={Edit.slug}
            name="slug"
            id="slug-genrater"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
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
              onChange={(e)=>{SetEdit({
                ...Edit,
                category_id:e.target.value
              })}}
              value={Edit.category_id}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option disabled selected>
                select Category
              </option>
              {categoryApiFetch.data?.map((d) => {
                return <option value={d._id} key={d._id} >{d.name}</option>;
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
              onChange={(e)=>{SetEdit({
                ...Edit,
                category_id:e.target.value
              })}}
              value={Edit.category_id}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option disabled selected>
                select Color
              </option>
              {colordata.data?.map((d) => {
                return <option value={d._id} key={d._id} >{d.name}</option>;
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
              onChange={(e) => {
                SetEdit({
                  ...Edit,
                  price:e.target.value,
                  final:callvalue()
                });}}
              value={Edit.price}
              ref={priceRef}
              name="price"
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
              id="discount"
              onChange={(e)=>{SetEdit({...Edit,
              discount:e.target.value,
            final:callvalue()})}}
              value={Edit.discount}
              ref={discountRef}
              name="discount"
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
              value={Edit.final}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
  
            />
          </div>
        </div>
        <div className="mb-3">
          <label
            htmlFor="slug-genrater"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            {" "}
            Upload Image{" "}
          </label>
          <input
            type="file"
            name="image"
            // value={Edit.image}
            id="images"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        
        </div>
          <img  width="50px" src={baseurl + "/"+Edit.image} alt=""/>
        <button
          type="submit"
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
        <div
          onClick={() => nevigate(-1)}
          className="float-right m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[100px]"
        >
          Back
        </div>
      </form>
    </div>
  );
};
export default Editcategory;
