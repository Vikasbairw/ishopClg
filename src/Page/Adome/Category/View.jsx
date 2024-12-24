import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../MainContext";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";


const View = () => {
  const { notify } = useContext(Context);
  const [Category, Setcategory] = useState([]);
  const [Image, SetImage] = useState(null);
  const readApi = () => {
    axios
      .get("http://localhost:5000/category/")
      .then((success) => {
        if (success.data.status === 1) {
          Setcategory(success.data.data);
          SetImage(success.data.base_url);
        } else {
          notify(success.data.msg, "error");
        }
      })
      .catch((err) => {
        notify(err.data.msg, "error");
      });
  };
  useEffect(() => {
    readApi();
  }, []);

  //delete method using for the delete category

  const datadelete = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:5000/category/delete/${id}`)
      .then((success) => {
        if (success.data.status == 1) {
          console.log(success);
          readApi();
          notify(success.data.msg, "success");
        }
      })
      .catch((error) => {
        console.log(error);
        notify(error.data.msg, "error");
      });
  };
  return (
    <div className="shadow p-4 m-3 bg-slate-300">
      <div className="text-xl font-bold">Category Listing</div>
      <hr className="my-3"></hr>

      <div className="rounded overflow-hidden">
        <table className="w-full h-[100%] ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                SubCategory
              </th>
              <th scope="col" className="px-6 py-3">
                Slug
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Category.map((d, i) => {
              return (
                <tr
                  key={i}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {d.name}
                  </th>
                  <td className="px-6 py-4">{d.subcategory}</td>
                  <td className="px-6 py-4">{d.slug}</td>
                  <td className="px-6 py-4">
                    <img width="60px" src={Image + d.image} alt="" />
                  </td>
                  <td className="px-6 py-4">
                    {d.status == true ? "Active" : "Unactive"}
                  </td>
                  <td className="px-6 py-4 ">
                    <Link to={"/admin/category/edit/" + d._id}>
                      <button className="text-[25px] me-3"><CiEdit /></button>
                    </Link>  
                    <button className="text-[25px]"
                      onClick={() =>{
                        datadelete(d._id);
                      }}
                    >
                     <MdDeleteOutline />
                    </button>
                  </td>
               
            
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default View;
