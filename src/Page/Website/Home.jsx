import React, { useContext, useState, useEffect } from "react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { Context } from "../MainContext";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./reduxer/Cart";
import axios from "axios";

export default function Home() {
  const { pro_url, product,notify } = useContext(Context);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.User);

  const [currentIndex, setCurrentIndex] = useState(0);
  const imagesToShow = 4; 

 


  const CartHandler = (data) => {
    dispatch(addToCart(data));
    if (user) {
      axios
        .post(`http://localhost:5000/cart/add-to-cart/${user._id}`, data)
        .then((res) => console.log("Added to cart:", res))
        .catch((err) => console.error("Error:", err));
    } else {
     notify("Add cart","success")
    }
  };

  return (
    <div className="container-fluid p-0 homepage">
    <div class="container mx-auto px-6 my-8">
        
        <div class="h-64 rounded-md overflow-hidden bg-cover bg-center bg_image_sport" >
            <div class="bg-[#FF4252] bg-opacity-50 flex items-center h-full">
                <div class="px-10 max-w-xl">
                    <h2 class="text-2xl text-white font-semibold">Sport Shoes</h2>
                    <p class="mt-2 text-white">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore facere provident molestias ipsam sint voluptatum pariatur.</p>
                    <button class="flex items-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                        <span>Shop Now</span>
                        <svg class="h-5 w-5 mx-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </button>
                </div>
            </div>
        </div>
        
     
        <div class="md:flex mt-8 md:-mx-4">
            <div class="w-full h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:w-1/2 bg_image_beauty" >
                <div class="bg-[#FF4252] bg-opacity-50 flex items-center h-full ">
                    <div class="px-10 max-w-xl ">
                        <h2 class="text-2xl text-white font-semibold">Beauty</h2>
                        <p class="mt-2 text-white">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore facere provident molestias ipsam sint voluptatum pariatur.</p>
                        <button class="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
                            <span>Shop Now</span>
                            <svg class="h-5 w-5 mx-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="w-full h-64 mt-8 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:mt-0 md:w-1/2 bg_image_gaming" >
                <div class="bg-[#FF4252] bg-opacity-50 flex items-center h-full ">
                    <div class="px-10 max-w-xl">
                        <h2 class="text-2xl text-white font-semibold">Games</h2>
                        <p class="mt-2 text-white">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore facere provident molestias ipsam sint voluptatum pariatur.</p>
                        <button class="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
                            <span>Shop Now</span>
                            <svg class="h-5 w-5 mx-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>      
    </div>

      {/* Best Seller Section */}
      <div className="container text-center py-4">
        <h2 className="text-2xl font-bold">BEST PRODUCTS</h2>
      </div>

      {/* Product Listing */}
      <div className="max-w-[1300px] m-auto flex flex-wrap gap-4 justify-center mt-3 ">
        {product?.data?.map((d, i) => (
          <ul key={i} className="relative m-3 rounded-[15px] overflow-hidden border homepage">
            <Link to={`/store/product/${d?.slug}`}>
              {d?.discount > 10 && (
                <span className="absolute top-[20px] left-0 px-2 rounded text-white bg-[#dc2626]">
                  {d?.discount}% off
                </span>
              )}
              <li className="sm:w-[250px] sm:h-[200px] h-[230px] w-[330px]">
                <img
                  src={pro_url + d?.image || `https://picsum.photos/200?random=${i}`}
                  className="w-full h-full"
                  alt={d?.name}
                />
              </li>
            </Link>
            <li className="capitalize font-serif text-[#575956d9] p-2">{d?.name}</li>
            <li className="capitalize font-serif text-[#575956d9] p-2">₹{d?.final}</li>
            <li
              className="absolute bottom-3 right-2 cursor-pointer"
              onClick={() => CartHandler({ pId: d._id, qty: 1 })}
            >
              <svg
                className="h-8 w-8 text-red-400"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <circle cx="9" cy="19" r="2" />
                <circle cx="17" cy="19" r="2" />
                <path d="M3 3h2l2 12a3 3 0 0 0 3 2h7a3 3 0 0 0 3 -2l1 -7H5" />
              </svg>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}
