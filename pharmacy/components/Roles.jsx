import React from "react";
import admin_pic from "../src/assets/admin.svg";
import cashier_pic from "../src/assets/cashier.svg";
import user_pic from "../src/assets/user.svg";
import { Link } from "react-router";
export default function Roles() {
  const users = [
    {
      logo: admin_pic,
      bg_logo: "bg-purple-100",
      title: "Admin",
      describtion:
        "Full system access to manage inventory, users, view analytics, and configure system settings.",
      link: "/admin",
      link_color: "bg-[#cf4ada]",
      permissions: [
        "Inventory Management",
        "User Management",
        "Analytics & Reports",
        "System Settings",
      ],
      bullets_color: "marker:text-[#cf4ada]",
      border_color: "border-t-[#cf4ada]",
      btn_title: "Admin Login",
    },
    {
      logo: cashier_pic,
      bg_logo: "bg-green-100",
      title: "Cashier",
      describtion:
        "Point-of-sale access to process transactions, manage sales, and handle customer purchases.",
      link: "/cashier",
      link_color: "bg-green-500",
      permissions: [
        "Process Sales",
        "Manage Transactions",
        "View Product Catalog",
        "Generate Receipts",
      ],
      bullets_color: "marker:text-green-500",
      border_color: "border-t-green-500",
      btn_title: "Cashier Login",
    },
    {
      logo: user_pic,
      bg_logo: "bg-blue-100",
      title: "User",
      describtion:
        "Customer access to browse medicines, place orders, and track purchase history.",
      link: "/user",
      link_color: "bg-blue-600",
      permissions: [
        "Browse Medicines",
        "Place Orders",
        "Track Orders",
        "View Purchase History",
      ],
      bullets_color: "marker:text-blue-600",
      border_color: "border-t-blue-600",
      btn_title: "User Login",
    },
  ];

  return (
    <section className="py-10">
      <div className={`flex flex-col justify-center items-center gap-5`}>
        <h2 className={`text-xl md:text-3xl lg:text-4xl font-bold`}>
          Choose Your Role
        </h2>
        <p className="text-gray-700 pb-10">
          Access the system based on your responsibilities
        </p>
      </div>
      <div
        className={`container m-auto lg:max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-5`}
      >
        {users.map((c, idx) => (
          <article
            key={idx}
            className={`h-auto rounded-xl flex flex-col gap-5 p-5
        bg-white shadow-2xl shadow-gray-500 transition-all duration-500 hover:scale-110 
        border-t-4 ${c.border_color}
        `}
          >
            <div
              className={`logo w-20 h-20 flex justify-center items-center rounded-full ${c.bg_logo}`}
            >
              <img src={c.logo} alt="" className="w-10" />
            </div>
            <span className={`text-xl font-bold`}>{c.title}</span>
            <p className={`text-lg font-light text-gray-700`}>
              {c.describtion}
            </p>
            <ul className={`list-disc ${c.bullets_color} px-5 marker:text-xl`}>
              {c.permissions.map((p, idx) => (
                <li key={idx} className={`font-light`}>
                  {p}
                </li>
              ))}
            </ul>
            <Link
              to={c.link}
              className={` text-white ${c.link_color} text-center px-4 py-2 rounded-lg font-semibold`}
            >
              {c.btn_title}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
