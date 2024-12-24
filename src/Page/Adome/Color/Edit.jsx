import React, { useContext, useRef, useState, useEffect } from "react";
import axios from "axios";
import { Context } from "../../MainContext";
import { useNavigate, useParams } from "react-router-dom";

const Editcolor = () => {
  const navigate=useNavigate()
  const { notify} = useContext(Context);
  const { id } = useParams();
  const[fetchcolor,setfetchcolor]=useState()
  useEffect(() => {
    axios
      .get("http://localhost:5000/color/" + id)   
      .then((success) => {
        if (success.data.status == 1) {
          setfetchcolor(success.data.data)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const inpRef = useRef();
  const genratorslug = (e) => {
    const inputtittle = e.target.value;
    const slug = inputtittle.toLowerCase().replace(/ /g, "-");
    inpRef.current.value = slug;
  };

  const SumbitHandler = (e) => {
    e.preventDefault();
    const formdata = {
      name: e.target.name.value,
      slug: e.target.slug.value,
      code: e.target.color.value,
    };
    axios
      .patch("http://localhost:5000/color/edit/" + id, formdata)
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
      <div className="text-xl font-bold">Edit Color</div>
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
            onChange={genratorslug}
            name="name"
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
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="colorcode"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Color Code
          </label>
          <input
            type="color"
            name="color"
            id="colorcode"
            placeholder="#fa3425"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
        <div
          onClick={() => navigate(-1)}
          className="float-right m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[100px]"
        >
          Back
        </div>
      </form>
    </div>
  );
};

export default Editcolor;