import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../MainContext";

function AdminUser() {
    const { notify } = useContext(Context);
    const usernevigate= useNavigate();
    const createAdmin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirm_password = e.target.confirm_password.value;

        if (password === confirm_password) {
            axios.post("http://localhost:5000/admin/admin-user", { email, password }).then(
                (success) => {
                    notify(success.data.msg, "success")
                    usernevigate("/admin")
                }
            ).catch(
                (error) => {
                    console.log(error)
                    notify(error.data.msg, "error")
                }
            )
        } else {
            console.log("errr")
            notify("Both passwords are not mach", "error");
        }
    }
    return (
        <>

            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Link to="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img src="/img/iSHOP.svg" alt="Logo" />
                    </Link>
                    <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
                                Create admin account
                            </h1>
                            <form onSubmit={createAdmin} className="space-y-4">
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

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}


export default AdminUser;