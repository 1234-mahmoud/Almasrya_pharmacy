import React from 'react'
import box_pic from "../src/assets/box.svg";
import up_arrow from "../src/assets/up_arrow.svg";
import Search from "../components/Search";
import revenu from "../src/assets/revenu.svg";
import cart_pic from "../src/assets/cart.svg";
import { FaBox, FaDollarSign } from "react-icons/fa6";
import { RiShoppingCartLine } from "react-icons/ri";
import Cart from "../components/Cart";
export default function PointOfSale() {
     const pharmacy_data = [
    {
      title: "Today's Sales",
      num: "$12,450",
      icon: FaDollarSign,
      icon_bg: "text-[#00c950]",
    },
    {
      title: "Transactions",
      num: "15",
      icon: RiShoppingCartLine,
      icon_bg: "text-[#2d7ffb]",
    },
    { title: "Items Sold", num: "48", icon: FaBox, icon_bg: "text-[#ad47fb]" },
  ];
  return (
    <div className=''>
       <div
        className={`grid grid-cols-1 md:grid-cols-3 gap-10  py-5 max-sm:px-3`}
      >
        {pharmacy_data.map((d, idx) => {
          const Icon = d.icon;
          return (
            <div
              key={idx}
              className={` h-28 rounded-xl flex justify-between items-center p-5
        bg-white shadow-xl shadow-gray-500 transition-all duration-500 hover:scale-110 
        `}
            >
              <div className={`flex flex-col gap-5`}>
                <span className={`text-gray-600 font-semibold`}>{d.title}</span>
                <span className={`text-xl lg:text-2xl font-bold`}>{d.num}</span>
              </div>
              <Icon className={`w-10 h-10 lg:w-12 lg:h-12 ${d.icon_bg}`} />
            </div>
          );
        })}
      </div>
      <div className={`flex items-start flex-col xl:flex-row gap-5`}>
        {/* Pharmacy Info */}
        <div className=" w-full px-3 md:px-0">
          <div
            className={`w-full h-full rounded-xl flex flex-col gap-5 items-center p-5
             bg-white shadow-2xl relative 
             `}
          >
            <div className={`w-full flex flex-col gap-5`}>
              <span className={`text-xl font-bold`}>Available Medicines</span>

              {/* Search */}
              <Search />
              {/* line braek */}
              <span className="line_break"></span>
            </div>

            {/* Medicines */}
            <div
              className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  py-5`}
            >
              <div
                className={`w-full h-35 rounded-xl flex justify-between items-center px-3 
        bg-white border border-gray-300 hover:border-blue-400
        `}
              >
                <div className={`w-full flex flex-col gap-3 `}>
                  <span
                    className={`w-full flex justify-between items-center gap-3`}
                  >
                    <span className={`text-sm md:text-lg font-bold`}>
                      Paracetamol 500mg
                    </span>
                    <span
                      className={`bg-gray-100 text-gray-700 w-fit px-3 py-1 rounded-lg`}
                    >
                      Pain Relief
                    </span>
                  </span>
                  <div className={`flex justify-between items-center`}>
                    <span className={`flex flex-col gap-1`}>
                      <span className={`text-xl font-bold text-[#00a63e]`}>
                        $5.99
                      </span>
                      <span className={`text-md text-gray-600`}>
                        Stock: 150
                      </span>
                    </span>
                    <button
                      className={`bg-[#00a63e] text-white font-bold w-15 p-2 rounded-md`}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Cart */}
        <div className="w-full xl:w-xl px-3 md:px-0">
          <Cart />
        </div>
      </div>
    </div>
  )
}
