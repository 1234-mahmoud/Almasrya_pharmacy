import React from "react";
import arrow from '../src/assets/arr.svg'
import { Link } from "react-router";
export default function Hero() {
  return (
    <section className={`bg-blue-100/50 py-10 md:py-20 lg:py-30
    flex flex-col justify-center items-center gap-8
    `}>
      <p className={`text-2xl md:text-4xl lg:text-5xl font-extrabold`}>
        Welcome to <span className={`text-blue-600`}>Almasrya</span>
      </p>
      <p className={`text-center px-3 text-gray-600 w-full md:w-100 lg:w-150`}>
        A comprehensive pharmacy management system designed to streamline your
        operations, enhance customer service, and improve inventory management.
      </p>
      <Link to="/login" className={`bg-blue-600 text-white p-4 flex items-center gap-2 rounded-lg hover:bg-blue-700`}>Get Started <img src={arrow} alt="" className={`w-5`}/></Link>
    </section>
  );
}
