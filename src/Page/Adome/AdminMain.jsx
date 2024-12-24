import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {  useNavigate } from "react-router-dom";
import { Context } from "../../Page/MainContext";

const AdminMain = () => {
  const {admin}=useContext(Context)
  const nevigate=useNavigate()
if(admin === null){
nevigate("/admin/login")
}
  return (
    <div className="grid grid-cols-5 ">
      <div className="border border-[#243c5a]">
        <SideMenu />
      </div>
      <div className="border border-green-400 col-span-4 ">
        <Header />
        <div className="h-full">
          <Outlet />{" "}
        </div>
        <Footer />
      </div>
    </div>
  );
};

const Header = () => {
  return <div className="shadow-sm py-3 sticky top-0"></div>;
};

const Footer = () => {
  return <div className="shadow-sm py-3 sticky bottom-0"></div>;
};

const SideMenu = () => {
  const menu = [
    { name: "Dashboard", url: "/admin", children: null },
    {
      name: "Category",
      url: null,
      children: [
        { name: "add", url: "/admin/category/add" },
        { name: "view", url: "/admin/category" },
      ],
    },
    {
      name: "Product",
      url: null,
      children: [
        { name: "add", url: "/admin/product/add" },
        { name: "view", url: "/admin/product" },
      ],
    },
    {
      name: "Color",
      url: null,
      children: [
        { name: "add", url: "/admin/color/add" },
        { name: "view", url: "/admin/color" },
      ],
    },
    { name: "Distibute Users", url: "/admin/users", children: null },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-600  h-full text-white">
      <div className="text-center font-bold py-2 text-4xl ">Admin Panel</div>
      <hr />
      <ul className="px-6 mt-3 ">
        {menu.map((item) => {
          return <SideItem item={item} key={item.name} />;
        })}
      </ul>
    </div>
  );
};

const SideItem = ({ item }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      {item.children == null ? (
        <Link to={item.url}>
          <li className="pb-[10px]" key={item.name}>
            {item.name}
          </li>
        </Link>
      ) : (
        <li
          onClick={() => {
            setToggle(!toggle);
          }}
          className="cursor-pointer py-2"
        >
          {item.name}
          <ul
            className={`bg-white rounded my-2 px-2 text-black ${
              toggle ? "block" : "hidden"
            }`}
          >
            {item.children.map((child) => {
              return (
                <Link to={child.url} key={child.name}>
                  <li>{child.name}</li>
                </Link>
              );
            })}
          </ul>
        </li>
      )}
    </div>
  );
};

export default AdminMain;
