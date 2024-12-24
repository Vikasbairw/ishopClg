import React, { useContext } from "react";
import { AiFillCaretDown, AiOutlineMenu } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import { FiShoppingBag } from 'react-icons/fi'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Page/Website/reduxer/User";
import { cartempty } from "../../Page/Website/reduxer/Cart";
import { Context } from "../../Page/MainContext";

export default function Header() {
  const { cart } = useSelector(store => store.Cart)
  const { user } = useSelector(store => store.User)
  const dispatch = useDispatch();
  const {notify} = useContext(Context);

  return (
    <>
    <div className="sticky top-0 z-[999] bg-white">
     <div className="md:flex  justify-between  px-4  py-[20px] hidden md:max-w-[1100px] m-auto  ">
          <div className=" hidden md:flex gap-[20px] items-center ">
           <Link to={'/'}><img src="/img/iSHOP.svg" /></Link> 
          </div>

          <div className=" hidden md:flex gap-[35px] ">
            <div className="flex items-center gap-[10px]">
              <span><IoPersonOutline /></span>
              {
                user === null ? <>

                  <span>My Profile</span>
                </> :
                  <>
                    {
                      user.name
                    }

                  </>
              }

            </div>
            <div className="flex items-center gap-[10px]">
              <Link to={'/cart'}><span className="relative"><FiShoppingBag />
                <span className="absolute text-[10px]  bg-[#FF1E56]  rounded px-1 right-[-2px] top-[-8px]">
                  {cart.length}
                </span></span></Link>
              <span>{cart.length} items</span>

              {
                user === null ? <>
                  <span className=" p-2 rounded bg-[#FF4252] text-white "><Link to={'/login'}>Login</Link></span>
                  <span className="p-2 rounded bg-[#FF4252] text-white "><Link to={"/singup"}>Singup</Link> </span>
                </> :
                  <>
                    <span className="p-2 rounded bg-[#FF4252] text-white " onClick={() => { dispatch(logout()); localStorage.removeItem('cart'); dispatch(cartempty()); notify("User logOut","error")}}>LogOut </span>
                  </>

              }

            </div>
          </div>

        </div>
        </div>
      <div className="w-full py-3   top-0 z-[99999] bg-white ">
       
        <div className="container m-auto flex justify-between p-3 items-center md:py-[40px] md:justify-center">
          
          <span className="md:hidden"><AiOutlineMenu /></span>
        </div>
        <div className="  md:text-center md:flex justify-center gap-[20px] hidden">
          <Link to={"/"}>HOME</Link>
          <Link to={"/store"}>STORE</Link>
          <Link to={"/iphone"}>IPHONE</Link>
          <Link to={"/laptop"}>LAPTOP</Link>

        </div>
      </div>

    </>
  );
}
