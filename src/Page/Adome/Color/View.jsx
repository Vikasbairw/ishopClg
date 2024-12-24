import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../MainContext";
import { Link, useParams } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";


const ColorView = () => {
  const { notify } = useContext(Context);
  const [Color, Setcolor] = useState([]);
  const colorApi = () => {
    axios
      .get("http://localhost:5000/color/")
      .then((success) => {
        if (success.data.status === 1) {
          Setcolor(success.data.data);
        } else {
          notify(success.data.msg, "error");
        }
      })
      .catch((err) => {
        notify(err.data.msg, "error");
      });
  };

  function statusChnage(id, status) {
    axios.patch(`http://localhost:5000/color/status/${id}/${status}`).then(
      (success) => {
        if (success.data.status == 1) {
          notify(success.data.msg, "success")
          colorApi();
        }
      }
    ).catch(
      (error) => {
        notify(error.data.msg, "error");
      }
    )
  }

  useEffect(() => {
    colorApi();
  }, []);

  //delete method using for the delete category

  const colordelete = (id) => {

    axios
      .delete(`http://localhost:5000/color/delete/${id}`)
      .then((success) => {
        if (success.data.status == 1) {
          colorApi();
          notify(success.data.msg, "success");
        }
      })
      .catch((error) => {
        notify(error.data.msg, "error");
      });
  };
  return (
    <div className="shadow p-4 m-3 bg-slate-300">
      <div className="text-xl font-bold">Color Listing</div>
      <hr className="my-3"></hr>

      <div className="rounded overflow-hidden">
        <table className="w-full h-[100%] ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Slug
              </th>
              <th scope="col" className="px-6 py-3">
                Color-view
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

            {Color.map((d, i) => {
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
                  <td className="px-6 py-4">{d.slug}</td>

                  <td className="px-6 py-4" >
                    <span className={` px-5 py-2 bg-[${d.code}] `} style={{ background: `${d.code}` }}></span>
                  </td>
                  <td className="px-6 py-4" >
                    <span className="px-4 py-2 text-white cursor-pointer" style={
                      {
                        background: d.status == false ? "red" : "orange"
                      }
                    } onClick={() => { statusChnage(d._id, !d.status) }}
                    > {d.status == true ? "Active" : "Unactive"}</span>

                  </td>
                  <td className="px-6 py-4 ">
                    <Link to={"/admin/color/edit/" + d._id}>
                      <button className="text-[25px] me-3"><CiEdit /></button>
                    </Link>
                    <button className="text-[25px]"
                      onClick={() => {
                        colordelete(d._id);
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

export default ColorView;
