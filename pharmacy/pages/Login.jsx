import React, { useState,useEffect } from "react";
import InputField from "../components/InputField";
import API from "../api";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import {
  RiMailLine,
  RiLockLine,
  RiUserFill,
  RiIdCardLine,
  RiAdminLine,
} from "react-icons/ri";

import { Link, useNavigate, useLocation  } from "react-router";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const location = useLocation();
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

  const [selected, setSelected] = useState(2);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const selection = (idx) => {
    setSelected(idx);
  };

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // submit login
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await API.post("/api/auth/login", {
        ...formData,
        role: data[selected].role,
      });

      dispatch(
        login({
          token: response.data.token,
          user: response.data.user,
        }),
      );

      setMessage("Login Successfully 🎉");

      // redirect example
      setTimeout(() => {
        const role = response.data.user.role;

        if (role === "admin") {
          navigate("/admin");
        } else if (role === "cashier") {
          navigate("/cashier");
        } else {
          navigate("/user");
        }
      }, 1000);
    } catch (error) {
      //  console.log(error);
      //   console.log(error.response?.data);
      setError(error.response?.data?.message || "Login Failed !!");
    }
  };

  useEffect(() => {
  const role = location.state?.role;

  if (!role) return;

  const index = data.findIndex((item) => item.role === role);

  if (index !== -1) {
    setSelected(index);
  }
}, [location.state]);

  return (
    <div
      className={`max-w-6xl my-10 mx-2 lg:mx-auto grid grid-cols-1 md:grid-cols-2 gap-10`}
    >
      {/* Roles Selection*/}
      <div
        className={`bg-white rounded-md p-5 flex flex-col gap-5 shadow-2xl shadow-gray-500`}
      >
        <h2 className={`font-bold text-2xl`}>Select Your Role</h2>

        {/* Roles */}
        <div className={`flex flex-col gap-5`}>
          {data.map((r, idx) => {
            const Icon = r.icon;

            return (
              <div
                key={idx}
                onClick={() => selection(idx)}
                className={`border border-gray-300 rounded-md p-3 
                  flex items-center gap-5 cursor-pointer
                  ${selected === idx ? r.outline_color : ""}
                `}
              >
                <div
                  className={`w-15 h-15 rounded-full bg-gray-200 flex justify-center items-center
                    ${selected === idx ? r.bg_icon : ""}
                  `}
                >
                  <Icon
                    className={`w-7 h-7 text-gray-700 
                      ${selected === idx ? "text-white" : ""}
                    `}
                  />
                </div>

                <span className={`flex flex-col gap-1`}>
                  <span className="font-bold">{r.title}</span>

                  <span className="text-gray-700">{r.description}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Login */}
      <div
        className={`bg-white rounded-md p-5 flex flex-col gap-5 shadow-2xl shadow-gray-500`}
      >
        {/* Role Login */}
        <div className={`flex flex-col justify-center items-center gap-5`}>
          <div
            className={`w-15 h-15 rounded-full bg-gray-200 flex justify-center items-center
              ${data[selected].bg_icon}
            `}
          >
            {(() => {
              const Icon = data[selected].icon;

              return <Icon className={`w-8 h-8 text-white`} />;
            })()}
          </div>

          <h2 className={`text-xl font-bold`}>{data[selected].title} Login</h2>

          <p>Enter your credentials to continue</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className={`flex flex-col gap-5`}>
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

          <input
            type="submit"
            value={`Login As ${data[selected].title}`}
            className={`text-white font-bold ${data[selected].bg_icon} w-full max-w-lg p-2 m-auto rounded-md cursor-pointer`}
          />
          <p className="text-center">
         
          <Link to="/forget" className="text-blue-700">
            Forget Passsword?
          </Link>
          </p>
        </form>

        {/* SUCCESS MESSAGE */}
        {message && (
          <p className="text-green-600 font-semibold text-center">{message}</p>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <p className="text-red-600 font-semibold text-center">{error}</p>
        )}

        <p className="text-center">
          don't have an account?{" "}
          <Link to="/register" className="text-blue-700">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}
