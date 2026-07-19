import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Search from "../components/Search";
import Medicines from "../components/Medicines";
import MyOrders from "../components/MyOrders";
import Profile from "../components/Profile";
import Cart from "../components/Cart";

export default function User() {
  const [tab, setTab] = useState("Browse Medicines");

  const tabs = [
    { id: 0, tab: "Browse Medicines" },
    { id: 1, tab: "Cart" },
    { id: 2, tab: "My Orders" },
    { id: 3, tab: "Profile" },
  ];

  // switch tabs
  const switch_tabs = () => {
    switch (tab) {
      case "Browse Medicines":
        return <Medicines selectedCategory={selectedCategory} />; // ✅ pass it down

      case "My Orders":
        return <MyOrders />;

      case "Profile":
        return <Profile />;

      case "Cart":
        return <Cart />;

      default:
        return <Medicines selectedCategory={selectedCategory} />;
    }
  };
  const { medicines } = useSelector((state) => state.medicine);
  const categories = [...new Set(medicines.map((m) => m.category))];
  const [selectedCategory, setSelectedCategory] = useState("");
  return (
    <div className={`w-full mx-auto mb-10 flex flex-col gap-5`}>
      {/* Header */}
      <div className={`bg-blue-600 text-white py-5 px-2 md:px-7 lg:px-30`}>
        <h1 className={`my-1 text-xl md:text-3xl lg:text-4xl font-bold`}>
          Welcome to Almasrya Pharmacy
        </h1>

        <p className={`text-gray-100`}>
          Browse and order your medications online
        </p>
      </div>

      <div className={`container m-auto flex flex-col gap-3 px-3 max-w-6xl`}>
        {/* Tabs */}
        <div className="flex gap-3 flex-wrap">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.tab)}
              className={`px-4 py-2 rounded-md transition-all
                ${
                  tab === item.tab
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-black"
                }
              `}
            >
              {item.tab}
            </button>
          ))}
        </div>

        {/* Search / filter */}
        {tab === "Browse Medicines" && (
          <div
            className={`w-full h-full rounded-xl grid grid-cols-1 md:grid-cols-2 gap-2 p-5
              bg-white shadow-2xl relative`}
          >
            <Search />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`border border-gray-400 p-3 rounded-md
              transition-all ease-in-out duration-200
              focus-within:outline-blue-500 focus-within:outline-2`}
            >
              <option value="">All Categories</option>

              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Render selected tab */}
        {switch_tabs()}
      </div>
    </div>
  );
}
