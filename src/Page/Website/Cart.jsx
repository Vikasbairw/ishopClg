import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { inc ,dec,removeToCart} from '../Website/reduxer/Cart'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Cart() {
  const {cart}=useSelector(store =>store.Cart)
  
  const {Base_Url,Product}=useSelector(store => store.product)
 
  const {user}=useSelector(store =>store.User)
  const dispatch=useDispatch()
  const nevigate=useNavigate()
    const cartProduct=[];
    let Total =0;
Product.forEach( (prod) => {
  cart.forEach(
    (cart)=>{
if(cart.pId == prod._id){
  cartProduct.push(
{
  ...prod,
  qty:cart.qty

}
 
  );
  Total += prod.final*cart.qty

}  })
});

function updatecart(pId,qty){
  if(user !=null){
axios.get(`http://localhost:5000/cart/qty-change/${user._id}/${pId}/${qty}`).then(
  (success)=>{
console.log(success)
  }
).catch(
  (error)=>{
console.log(error)
  }
)
  }else{

  }
}
function DeleteProduct(pId){
if(user !=null){
  axios.get(`http://localhost:5000/cart/item-delete/${pId}`).then(
    (success)=>{
  console.log(success)
    }
  ).catch(
    (error)=>{
  console.log(error)
    }
  )
}else{
  localStorage.removeItem('cart')
}
}

// Checkout function
function Checkout(){
  if(user !== null){
nevigate("/checkout")
  }else{
nevigate('/singup')
  }
}
  return (
    <div className="min-h-[100vh] bg-gray-100 pt-20">
    <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div className="rounded-lg md:w-2/3">
        {
          cartProduct.map(
            (items,i)=>{
            
return (
  <>
  {
    cart != [] ? <>
    <div className="justify-between mb-6  h-[200px] rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
<img
src={Base_Url+"/"+items.image}
  alt="product-image"
  className="w-full rounded-lg sm:w-40"
/>
<div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
  <div className="mt-5 sm:mt-0">
    <h2 className="text-lg font-bold text-gray-900">
{
  items.name
}    </h2>
  </div>
  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
    <div className="flex items-center border-gray-100">
      <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"  onClick={()=>{
        updatecart(items._id,items.qty-1)
        dispatch(dec({pId:items._id}))}}>
        -
      </span>
      <input
        className="h-8 w-8 border bg-white text-center text-xs outline-none"
        type="number"
        Value={items.qty}
        min={1}
      />
      <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={()=>{ 
        updatecart(items._id,items.qty+1)
        dispatch(inc({pId:items._id}))}}>
       +
      </span>
    </div>
    <div className="flex items-center space-x-4">
      <p className="text-sm">{items.final*items.qty}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
        onClick={()=>{
          DeleteProduct(items._id)
          dispatch(removeToCart({pId:items._id}))}}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  </div>
</div>
</div></> :<>jsdsakdajskd</>
      }
  </>
)


            }
          )
        }
        
       
      </div>
      {/* Sub total */}
      <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
       
        <hr className="my-4" />
        <div className="flex justify-between">
          <p className="text-lg font-bold">Total</p>
          <div className="">
            <p className="mb-1 text-lg font-bold">₹{Total}</p>
          </div>
        </div>
        <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={Checkout}>
          Check out
        </button>
      </div>
    </div>
  </div>

  )
}

export default Cart;