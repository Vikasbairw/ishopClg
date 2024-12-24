import React, { useContext, useEffect, useState } from "react";
import { Context } from "../MainContext";
import { Link, useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
export default function Store() {
  const { categoryApiFetch, product, category_base_url, pro_url, colordata } =
    useContext(Context);
    const [NewProduct, setNewProduct] = useState([]);
  const[filterclick,setfilterclick]=useState('')
  const [filtercolor, setfiltercolor] = useState('');
  const { slug } = useParams();
  const [Loader, Setloader] = useState(false);
  const Categorydata = categoryApiFetch.data?.filter((cate) => {
    if (cate.slug == slug) {
      return true;
    } else {
      return false;
    }
  });



useEffect(
  ()=>{
  const Product = product?.data?.filter(
      (data, index) => {
      if(data?.catdata?.name == filterclick){
        return true;
      }else if(data?.colordata?.name == filtercolor){
return true;
      }
     else if(filterclick == "" && filtercolor == ""){
        return data.catdata;
      }
       else{
        return false;
      }
      }
    )
    setNewProduct(Product);
  },[ ,filterclick,filtercolor]
)   
  


  

  

  
  useEffect(() => {
    Setloader(true)
    setTimeout(() => {
      Setloader(false);
    }, 500);

  }, [slug]);

  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplayspeed: 500,
    speed: 500,
    cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div
        className="fixed  justify-center items-center w-full h-screen top-0 let-0 z-[9999] "
        style={{
          background: "rgba(0,0,0,0.7",
          display: Loader == false ? "none" : "flex",
        }}
      >
        <div role="status">
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div className="max-w-[1300px] m-auto min-h-[650px]  grid grid-cols-7 pt-5">
        <div className="w-[285px]  rounded col-span-2">
          <div className="w-[270px]  bg-slate-100 rounded m-2">
            <h1 className="text-center p-2 text-[25px] font-bold">CATEGORY</h1>
            <ul>
              {/* <Link to={"/store"}> */}
                <li className="ps-[40px] cursor-pointer pb-1" onClick={() => {setfilterclick([])}}>
                  All({product.data?.length})
                </li>
              {/* </Link> */}
              {categoryApiFetch.data?.map((d, i) => {
                return (
                  // <Link key={i} to={`/store/${d.slug}`}>
                  <li className="ps-[40px] cursor-pointer pb-2" onClick={() => { setfilterclick(d.name) }}>
                    {d.name}({d.count})
                  </li>
                  // </Link>
                );
              })}
            </ul>
          </div>
          <div className="w-[270px] bg-slate-100 rounded m-2">
            <h1 className="text-center p-2 text-[25px] font-bold">COLOR</h1>
            <ul>
              <Link to={"/store"}>
                <li className="ps-[40px] cursor-pointer pb-1" onClick={()=>setfiltercolor([])}>
                  All({product.data?.length})
                </li>
              </Link>
              {colordata?.data?.map((d, i) => {
                return (
                  <Link key={i} to={`/store/${d.slug}`}>
                    <li className="ps-[40px] cursor-pointer pb-2" onClick={()=>{setfiltercolor(d?.name)}}>
                      {d.name}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>

        <div className=" col-span-5 ">
          <div className=" w-full">
            <Slider {...settings}>
              {categoryApiFetch.data?.map((d, i) => {
                return (
                  <div
                    className="h-[400px] relative rounded overflow-hidden "
                    key={i}
                  >
                    <img
                      src={category_base_url + d.image}
                      alt="category images"
                      className="h-full  w-full "
                    />{" "}
                    <div
                      className="absolute top-0 h-full w-full z-[999999] text-white flex justify-center items-center flex-col "
                      style={{ background: "rgba(0 ,0 ,0 ,0.3)" }}
                    >
                      <h1 className="text-[40px] font-bold">{d.name}</h1>
                      <Link
                        to={`/store/${d.slug}?`}
                        className="border-b-2 pt-2"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>

          <div className="max-w-[1300px] mt-[70px] min-h-[650px]  flex flex-wrap flex-grow justify-start  ">
            {NewProduct?.map((d, i) => {
              return (

                <ul key={i} className="p-6 relative ">
                  {
                    d.discount > 10 ? <span className="absolute top-[20px]   px-2 rounded text-white left-0 bg-[#dc2626]">{d.discount}% off</span> : ""
                  }

                  {/* <Link to={`/store/product/${d.slug}`}> */}
                  <li className=" w-[120px] md:w-[150px] h-[250px]">

                    <img src={pro_url + d.image} className="py-3 h-full " />
                  </li>
                  {/* </Link> */}
                  <li className="mt-2 text-sm text-gray-700">{d.name}</li>
                  <li className="mt-2 text-sm text-gray-700">{d?.colordata?.name}</li>

                  <li className="mt-1 text-lg font-medium text-gray-900">
                    $48
                  </li>
                </ul>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
