import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../MainContext';

function Signup() {
  const navigate = useNavigate();
  const { notify } = useContext(Context);

  // Signup function
  function createaccount(e) {
    e.preventDefault();

    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirm_password: e.target.confirm_password.value,
    };

    // Validate form inputs
    if (!data.name || !data.email || !data.password || !data.confirm_password) {
      notify("Please fill in all fields", "error");
      return;
    }

    if (data.password !== data.confirm_password) {
      notify("Passwords do not match", "error");
      return;
    }

    // Check if the user already exists
    axios.post('http://localhost:5000/user/loginup', data).then(
      (success) => {
        if (success.data.status === 1) {
          notify("User already exists", "error");
        } else {
          // User does not exist, create a new account
          axios.post('http://localhost:5000/user/create_account', data)
            .then((success) => {
              if (success.data.status === 1) {
                notify(success.data.msg, "success");
                navigate('/login');
              } else {
                notify(success.data.msg, "error");
              }
            })
            .catch((error) => {
              notify(error.response?.data?.msg || "Error creating account", "error");
            });
        }
      })
      .catch((error) => {
        notify(error.response?.data?.msg || "Error checking user", "error");
      });
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link to="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img src="/img/iSHOP.svg" alt="Logo" />
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 sm:p-8">
            <h1 className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
              Create an account
            </h1>
            <form onSubmit={createaccount} className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm text-gray-900 dark:text-white">
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  className="bg-gray-50 border rounded-lg w-full p-2.5 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                  className="bg-gray-50 border rounded-lg w-full p-2.5 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border rounded-lg w-full p-2.5 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block mb-2 text-sm text-gray-900 dark:text-white">
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border rounded-lg w-full p-2.5 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded-lg px-5 py-2.5 text-center"
              >
                Create an account
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
