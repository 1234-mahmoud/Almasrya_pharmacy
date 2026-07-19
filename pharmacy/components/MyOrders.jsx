import React from "react";
import { CiClock2 } from "react-icons/ci";

export default function MyOrders() {
  return (
    <div
      className={`w-full h-full rounded-xl flex flex-col gap-2 items-center 
              bg-white shadow-2xl relative 
              `}
    >
      {/* Order History */}

      <div
        className={`w-full flex flex-col gap-2  p-5
        border-b border-b-gray-300
        `}
      >
        <span className={`text-xl font-bold`}>Order History</span>
        <p className="text-gray-700">Track and view your past orders</p>
      </div>

      {/* Medicines Orders Details */}
      <div className="w-full px-5">
        <div
          className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  py-5`}
        >
          <div
            className={`w-full h-35 rounded-xl flex justify-between items-center px-3 
         bg-white border border-gray-300 transition ease-in-out duration-200 hover:shadow-sm hover:shadow-gray-400
         `}
          >
            <div className={`w-full flex flex-col gap-3 `}>
              <span
                className={`w-full flex justify-between items-center gap-3`}
              >
                <span className={`flex flex-col gap-1`}>
                  <span className={`text-sm font-bold`}>Order #000001</span>
                  <div className="flex items-center gap-2">
                    <CiClock2 />{" "}
                    <span className={`text-gray-700`}>2026-04-28</span>
                  </div>
                </span>
                <span
                  className={`bg-green-100 text-gray-800 w-fit px-3 py-1 rounded-lg`}
                >
                  Completed
                </span>
              </span>
              <div className={`flex justify-between items-center`}>
                <span className={`text-md text-gray-600`}>4 items</span>
                <span className={`flex flex-col gap-1`}>
                  <span className={`text-sm md:text-lg`}>Total</span>
                  <span className={`text-xl font-bold text-blue-600`}>
                    $5.99
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
