import React, { useState } from "react";

import API from "../api";

import InputField from "../components/InputField";

import {
  RiMailLine,
  RiLockLine,
  RiUserFill,
  RiPhoneFill,
  RiHome2Line,RiMap2Line,RiMailLockLine
} from "react-icons/ri";

export default function Register() {

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    street_address: "",
    city: "",
    state: "",
    zip_code: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // handle input change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value, //key:val
    });
  };

  // handle submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");

    try {

      const response = await API.post(
        "/api/auth/register",
        formData
      );

      setMessage("Registered Successfully 🎉");

      setFormData({
        fullname: "",
        email: "",
        password: "",
        phone: "",
        street_address: "",
        city: "",
        state: "",
        zip_code: "",
      });
  // clear message after 3 seconds
  setTimeout(() => {
    setMessage("");
  }, 1000);

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Registration Failed !!"
      );
    }
  };

  return (
    <div className="max-w-6xl my-10 mx-2 lg:mx-auto">

      <div className="
        bg-white rounded-md p-5
        flex flex-col gap-5
        shadow-2xl shadow-gray-500
      ">

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >

          <InputField
            label="Full Name"
            type="text"
            name="fullname"
            placeholder="Enter your full name"
            Icon={RiUserFill}
            value={formData.fullname}
            onChange={handleChange}
            required
          />

          <InputField
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            Icon={RiMailLine}
            value={formData.email}
            onChange={handleChange}
            required
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            Icon={RiLockLine}
            value={formData.password}
            onChange={handleChange}
            required
          />

           <InputField
            label="Phone"
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            Icon={RiPhoneFill}
            value={formData.phone}
            onChange={handleChange}
          />

           <InputField
            label="Street Address"
            type="text"
            name="street_address"
            placeholder="Enter your Street Address"
            Icon={RiHome2Line}
            value={formData.street_address}
            onChange={handleChange}
          />

           <InputField
            label="City"
            type="text"
            name="city"
            placeholder="Enter your City"
            Icon={RiMap2Line}
            value={formData.city}
            onChange={handleChange}
          />

           <InputField
            label="State"
            type="text"
            name="state"
            placeholder="Enter your State"
            Icon={RiMap2Line}
            value={formData.state}
            onChange={handleChange}
          />

           <InputField
            label="Zip Code"
            type="text"
            name="zip_code"
            placeholder="Enter Zip code"
            Icon={RiMailLockLine}
            value={formData.zip_code}
            onChange={handleChange}
          />

          <input
            type="submit"
            value="Register"
            className="
              text-white font-bold
              bg-blue-600
              w-full max-w-lg
              p-2 m-auto
              rounded-md
              cursor-pointer
            "
          />

        <a
  href="http://localhost:5000/api/auth/google"
  className="
    bg-gray-100
    p-2 m-auto
    rounded-md
     w-full max-w-lg
    text-center
    font-semibold
    flex justify-center items-center gap-3
  "
>
    <img
    src="https://www.svgrepo.com/show/475656/google-color.svg"
    alt="google"
    className="w-5 h-5"
  />

  Continue with Google
</a>

        </form>

        {/* SUCCESS MESSAGE */}
        {message && (
          <p className="text-green-600 font-semibold text-center">
            {message}
          </p>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <p className="text-red-600 font-semibold text-center">
            {error}
          </p>
        )}

      </div>
    </div>
  );
}
