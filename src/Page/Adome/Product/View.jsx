import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../MainContext";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";


const View = () => {
  const { notify ,pro_url,product,productread} = useContext(Context);
  // delete method using for the delete category

  const datadelete = (id) => {
    axios
      .delete(`http://localhost:5000/product/delete/${id}`)
      .then((success) => {
        if (success.data.status == 1) {
          notify(success.data.msg, "success");
          productread();
        }
      })
      .catch((error) => {
        console.log(error);
        notify(error.data.msg, "error");
      });
  };
  const statuschange=(id,statusvalue)=>{
axios.patch(`http://localhost:5000/product/status/${id}/${statusvalue}`)
.then((success) => {
  if (success.data.status == 1) {
    notify(success.data.msg, "success");
    productread();
  }
})
.catch((error) => {
  console.log(error);
  notify(error.data.msg, "error");
});
  }
  const bestsellerchange=(id,bestseller)=>{
    axios.patch(`http://localhost:5000/product/seller/${id}/${bestseller}`)
    .then((success) => {
      if (success.data.status == 1) {
        notify(success.data.msg, "success");
        productread();
      }
    })
    .catch((error) => {
      console.log(error);
      notify(error.data.msg, "error");
    });
      }
      useEffect(
        ()=>{
          productread();
        },[]
      )
  return (
    <div className="shadow p-4 m-3 bg-slate-300">
      <div className="text-xl font-bold">Food Listing</div>
      <hr className="my-3"></hr>

      <div className="rounded overflow-hidden">
        <table className="w-full h-[100%] ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
               Categ_sub & Slug 
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                PRICES
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
               Best_Seller
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {product.data?.map((d, i) => {
              console.log(d.catdata.subcategory)
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
                  <td className="px-6 py-4"> 
                    <div>{d.slug }{d.catdata.subcategory }</div>
                    </td>
                  <td className="px-6 py-4">
                   
                    <img width="60px" src={pro_url+ d.image} alt="" />
                  </td>
                  <td className="px-6 py-4">
                    
                    <del>₹{ d.price  }</del> <br/>
                    {d.discount}% off <br/>
                   ₹ {d.final}
                    
                  </td>
                  <td className="px-6 py-4" >
                 <button className="px-2 py-[10px] rounded text-white bold-sm" onClick={()=>{statuschange(d._id,!d.status)}}
                 style={{background:d.status==true?'red':'orange'}}> {d.status == true ? "ACTIVE" : "INACTIVE"}</button>  
                  </td>
                  <td className="px-6 py-4">
                  <button className="px-2 py-[10px] rounded text-white bold-sm" onClick={()=>{bestsellerchange(d._id,!d.best_seller)}}
                  style={{background:d.best_seller==true?'red':'orange'}}> {d.best_seller == true ? "YES" : "NO"}</button>  
        
                  </td>
                  <td className="px-6 py-4 ">
                    <Link to={"/admin/product/edit/" + d._id}>
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
