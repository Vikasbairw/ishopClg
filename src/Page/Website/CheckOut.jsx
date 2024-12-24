import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useRazorpay from 'react-razorpay';
import { useDispatch, useSelector } from 'react-redux';
import { cartempty } from '../Website/reduxer/Cart';
import { useNavigate } from 'react-router-dom';

function CheckOut() {
  const [Razorpay] = useRazorpay();
  const { user } = useSelector(store => store.User);
  const [UserData, setUserData] = useState({});
  const { Base_Url, Product } = useSelector(store => store.product);
  const { cart } = useSelector(store => store.Cart);
  const dispatch = useDispatch();
const navigate =useNavigate();
  const newProduct = [];
  let Total = 0;

  useEffect(() => {
    setUserData(user);
  }, [user]);

  Product.forEach(d => {
    cart.forEach(cartItem => {
      if (cartItem.pId === d._id) {
        newProduct.push({
          ...d,
          qty: cartItem.qty,
        });
        Total += (d.final * cartItem.qty);
      }
    });
  });

  const Order = () => {
    axios.post("http://localhost:5000/order/place-order", {
      user_details: UserData,
      order_details: newProduct,
      user_id: user._id,
      order_total: Total
    })
      .then(succ => {
        if (succ.data.status === 1) {
          razorpayPayment(succ.data.suc, succ.data.razorOrder);
        }
      })
      .catch(err => {
        console.error('Order Error:', err);
      });
  };

  const razorpayPayment = (order, razorOrder) => {
    const options = {
      key: "rzp_test_QLYy3lyOaqDBhp",
      amount: razorOrder.amount,
      currency: "INR",
      name: "Vikas Bairwa",
      description: "",
      image: "https://th.bing.com/th/id/OIP.dgMo683qPGVCuNNITvcQ-gHaEK?w=297&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
      order_id: razorOrder.id,
      handler: response => {
        axios.post('http://localhost:5000/order/order-success', { order, razorOrder, response })
          .then(success => {
            if (success.data.status === 1) {
              console.log(success.data)
                  dispatch(cartempty());
              navigate(`/order-success/${order._id}`)
            }
          })
          .catch(error => {
            console.error('Payment Success Error:', error);
          });
      },
      prefill: {
        name: UserData.name,
        email: UserData.email,
        contact: UserData.contact,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      alert(`Payment failed: ${response.error.description}`);
    });

    rzp1.open();
  };

  return (
    <div className="h-srceen grid grid-cols-3 checkoutFont">
      <div className="lg:col-span-2 col-span-3 bg-indigo-50 space-y-8 px-12 h-screen">
        <div className="rounded-md">
          <form id="payment-form">
            <section>
              <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
                Shipping &amp; Billing Information
              </h2>
              <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                  <span className="text-right px-2">Name</span>
                  <input
                    name="name"
                    className="focus:outline-none px-3 w-full"
                    placeholder="enter name"
                    required
                    value={UserData?.name || ''}
                    onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </label>
                <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                  <span className="text-right px-2">Email</span>
                  <input
                    name="email"
                    type="email"
                    className="focus:outline-none px-3 w-full"
                    placeholder="try@example.com"
                    required
                    value={UserData?.email || ''}
                    onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </label>
                <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                  <span className="text-right px-2">Contact</span>
                  <input
                    name="contact"
                    type="text"
                    className="focus:outline-none px-3 w-full"
                    placeholder="enter number"
                    required
                    value={UserData?.contact || ''}
                    onChange={(e) => setUserData(prev => ({ ...prev, contact: e.target.value }))}
                  />
                </label>
                <label className="flex border-b border-gray-200 py-3 items-center">
                  <span className="text-right px-2">Address</span>
                  <textarea
                    placeholder='enter address'
                    className='w-full focus:outline-none'
                    required
                    value={UserData?.address || ''}
                    onChange={(e) => setUserData(prev => ({ ...prev, address: e.target.value }))}
                  ></textarea>
                </label>
              </fieldset>
            </section>
          </form>
        </div>
        <div className="rounded-md">
          <section>
            <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
              Payment Information
            </h2>
            <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
              <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                <span className="text-right px-2">Card</span>
                <input
                  name="card"
                  className="focus:outline-none px-3 w-full"
                  placeholder="Card number MM/YY CVC"
                  required
                />
              </label>
            </fieldset>
          </section>
        </div>
        <button onClick={Order} className="submit-button px-4 py-3 rounded-full bg-pink-400 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors">
          Pay ₹ {Total}
        </button>
      </div>
      <div className="col-span-1 bg-white lg:block hidden">
        <h1 className="py-6 border-b-2 text-xl text-gray-600 px-8">
          Order Summary
        </h1>
        <ul className="py-6 border-b space-y-6 px-8">
          {newProduct.map((d, i) => (
            <li className="grid grid-cols-6 gap-2 border-b-1" key={i}>
              <div className="col-span-1 self-center">
                <img
                  src={Base_Url + d.image}
                  alt="Product"
                  className="rounded w-full"
                />
              </div>
              <div className="flex flex-col col-span-3 pt-2">
                <span className="text-gray-600 text-md font-semi-bold ps-3">
                  {d.name}
                </span>
              </div>
              <div className="col-span-2 pt-3">
                <div className="flex items-center space-x-2 text-sm justify-between">
                  <span className="text-gray-400">{d.qty} x ₹{d.final}</span>
                  <span className="text-pink-400 font-semibold inline-block">
                    ₹{d.final * d.qty}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="px-8 border-b">
          <div className="flex justify-between py-4 text-gray-600">
            <span>Subtotal</span>
            <span className="font-semibold text-pink-500">₹{Total}</span>
          </div>
          <div className="flex justify-between py-4 text-gray-600">
            <span>Shipping</span>
            <span className="font-semibold text-pink-500">Free</span>
          </div>
        </div>
        <div className="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
          <span>Total</span>
          <span>₹{Total}</span>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
