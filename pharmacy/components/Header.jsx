import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

import pharm from "../src/assets/pharmacy.svg";
import home from "../src/assets/home.svg";

import { Link, useNavigate } from "react-router";
import { RiLogoutBoxRLine } from "react-icons/ri";
export default function Header() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isLoggedin, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());

  window.location.replace("/");
  }
  return (
    <div
      className="
      bg-white h-25 pt-3 px-1
      flex flex-col gap-1
      md:flex-row md:justify-between
      items-center md:px-5
      shadow-lg shadow-gray-300
    "
    >
      <div className="flex items-center gap-2">
        <img src={pharm} alt="" className="w-10" />

        <h1
          className="
          font-bold text-xl
          md:text-2xl
          lg:text-3xl
        "
        >
          Almasrya Pharmacy
        </h1>
      </div>

      <div
        className="
        flex justify-center
        items-center gap-3
      "
      >
        <div
          className="
          flex justify-center
          items-center gap-1
        "
        >
          <img src={home} alt="" className="w-5" />

          <Link to="/" className="text-gray-500">
            Home
          </Link>
        </div>

        {isLoggedin ? (
          <>
            <span className="font-medium">{user?.fullname}</span>

            <button
              onClick={handleLogout}
              className="
                bg-red-600
                text-white
                px-3 py-1
                rounded-md
                hover:bg-red-700
                flex items-center gap-1 text-xl
              "
            >
              <RiLogoutBoxRLine color="rgba(255,255,255,1)" />
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="
              bg-blue-600
              text-white
              px-3 py-1
              rounded-md
              hover:bg-blue-700
            "
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
