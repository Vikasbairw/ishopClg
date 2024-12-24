import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Context } from "../../MainContext";
import { useNavigate, useParams } from "react-router-dom";

const Editcategory = () => {
  const navigate = useNavigate();
  const [Edit, SetEdit] = useState({ name: "", slug: "", image: "" });
  const [baseurl, setbaseurl] = useState();
  const { notify } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:5000/category/" + id)
      .then((success) => {
        if (success.data.status == 1) {
          setbaseurl(success.data.base_url);
          SetEdit(success.data.data[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const genratorslug = (e) => {
    
    const slug = e.toLowerCase().replace(/ /g, "-");
    return slug;
  };

  const SumbitHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", e.target.name.value);
    formdata.append("subcategory", e.target.subcategory.value);
    formdata.append("slug", e.target.slug.value);
    formdata.append("image", e.target.image.files[0]);
    axios
      .patch("http://localhost:5000/category/edit/" + id, formdata)
      .then((success) => {
        if (success.data.status == true) {
          notify(success.data.msg, "success");
          e.target.reset();
        } else {
          notify(success.data.msg, "error");
        }
      })
      .catch((err) => {
        console.log(err);
        notify(err.data.msg, "error");
      });
  };
  return (
    <div className="shadow  p-4 m-3">
      <div className="text-xl font-bold"> Edit Category </div>
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
            htmlFor="subcategory"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            {" "}
            subcategory{" "}
          </label>
          <input
            type="text"
            id="subcategory"
            name="subcategory"
            onChange={(e) => {
              SetEdit({
                ...Edit,
                subcategory: e.target.value
              });
            }}
            value={Edit.subcategory}
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
        <div className="mb-3">
          <label
            htmlFor="images"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            {" "}
            Upload Image{" "}
          </label>
          <input
            type="file"
            name="image"
            // value={Edit.image}
            id="images                                                                                                                                                                                      "
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>
        {
          // console.log(baseurl)
        }
        <img src={baseurl + "/" + Edit.image} width={"50px"} />
        <button
          type="submit"
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
export default Editcategory;
