import React, { useState } from "react";
import PointOfSale from "../components/PointOfSale";
import { CiClock2 } from "react-icons/ci";

export default function Cashier() {
  const [tab, setTab] = useState("pointOfSale");

  return (
    <div className="container px-2 md:mx-auto mb-10 flex flex-col gap-5">
      {/* Header */}
      <h1 className="mt-10 text-2xl md:text-3xl lg:text-4xl font-bold">
        Cashier Dashboard
      </h1>
      <p>Welcome back, Cashier User</p>

      {/* Tabs */}
      <div className="w-full rounded-xl p-5 flex items-center gap-5 bg-white shadow-2xl">
        <button
          onClick={() => setTab("pointOfSale")}
          className={`text-xs md:text-lg px-4 py-2 rounded-lg ${
            tab === "pointOfSale" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Point of Sale
        </button>

        <button
          onClick={() => setTab("transactions")}
          className={`text-xs md:text-lg px-4 py-2 rounded-lg ${
            tab === "transactions" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Transaction History
        </button>
      </div>

      {/* Content */}
      {tab === "pointOfSale" && <PointOfSale />}

      {tab === "transactions" && (
        <div
          className={`w-full rounded-xl block  bg-white shadow-2xl`}
        >
          <div className={`p-5 flex flex-col gap-3 `}>
            <h2 className={`text-xl md:text-2xl font-bold`}>
              Transaction History
            </h2>
            <p>View recent sales transactions</p>
          </div>
          <table className="w-full table-fixed bg-white shadow-xl rounded-b-xl">
            <thead className="text-gray-600 bg-gray-100">
              <tr>
                <th className="py-2 text-center text-xs md:text-[16px]">
                  Transaction ID
                </th>
                <th className="py-2 text-center text-xs md:text-[16px]">
                  Date
                </th>
                <th className="py-2 text-center text-xs md:text-[16px]">
                  Time
                </th>
                <th className="py-2 text-center text-xs md:text-[16px]">
                  Items
                </th>
                <th className="py-2 text-center text-xs md:text-[16px]">
                  Total
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b border-gray-300">
                <td className="py-3 text-center text-xs md:text-[16px]">
                  #000001
                </td>

                <td className="py-3 text-center text-xs md:text-[16px] text-gray-600">
                  2026-04-29
                </td>

                <td className="py-3 text-center text-xs md:text-[16px] text-gray-600">
                  <div className="flex justify-center gap-2">
                    <CiClock2 /> 14:30
                  </div>
                </td>

                <td className="py-3 text-center text-xs md:text-[16px] text-gray-600">
                  4
                </td>

                <td className="py-3 text-center text-xs md:text-[16px] text-gray-600">
                  $45.50
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
