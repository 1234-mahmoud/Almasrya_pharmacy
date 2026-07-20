import React from "react";
import { Link } from "react-router";
import InputField from "../components/InputField";
import {
  RiMailLine,
  RiLockLine,
  RiUserFill,
  RiIdCardLine,
  RiAdminLine,
} from "react-icons/ri";
export default function ForgetPassword() {
  const data = [
    {
      icon: RiAdminLine,
      bg_icon: "bg-purple-500",
      title: "Admin",
      description: "Full system access",
      outline_color: "outline-2 outline-purple-500",
      role: "admin",
    },
    {
      icon: RiIdCardLine,
      bg_icon: "bg-green-500",
      title: "Cashier",
      description: "Sales & transaction",
      outline_color: "outline-2 outline-green-500",
      role: "cashier",
    },
    {
      icon: RiUserFill,
      bg_icon: "bg-sky-400",
      title: "User",
      description: "Browse & purchase",
      outline_color: "outline-2 outline-sky-400",
      role: "user",
    },
  ];
  return (
    <div>
    <form className={`w-full max-w-2xl mx-auto my-20 flex flex-col gap-5
    bg-white rounded-md p-5 shadow-2xl shadow-gray-500
    `}>
      <InputField
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email"
        Icon={RiMailLine}
        // value={formData.email}
        // onChange={handleChange}
      />


      <input
        type="submit"
        value={`submit`}
        className={`text-white bg-blue-500 font-bold w-full max-w-xs p-2 m-auto rounded-md cursor-pointer`}
      />
      
    </form>















<form className={`w-full max-w-2xl mx-auto my-20 flex flex-col gap-5
    bg-white rounded-md p-5 shadow-2xl shadow-gray-500
    `}>
      <InputField
        label="New Password"
        type="password"
        placeholder="Enter The New Password"
        Icon={RiMailLine}
        // value={formData.email}
        // onChange={handleChange}
      />


      <input
        type="submit"
        value={`submit`}
        className={`text-white bg-blue-500 font-bold w-full max-w-xs p-2 m-auto rounded-md cursor-pointer`}
      />
      
    </form>



    </div>
  );
}
