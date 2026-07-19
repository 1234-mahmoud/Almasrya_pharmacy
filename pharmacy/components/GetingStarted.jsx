import React from "react";
import arr from "../src/assets/blue_arr.svg";
import { Link } from "react-router";
export default function GetingStarted() {
  return (
    <section
      className={`bg-blue-600 py-10 md:py-20 lg:py-30
    flex flex-col justify-center items-center gap-8 text-white`}
    >
      <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold`}>Ready to Get Started?</h2>
      <p className="text-center">
        Join thousands of pharmacies already using PharmaCare to streamline
        their operations
      </p>
      <Link to="/login" className={`bg-white text-blue-700 flex items-center gap-3
        px-4 py-2 rounded-md transition-all ease-in-out duration-300 hover:scale-110
        `}>
        Login Now <img src={arr} alt="" className="w-5"/>
      </Link>
    </section>
  );
}
