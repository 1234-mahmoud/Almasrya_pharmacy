import React from "react";
import { NavLink } from "react-router";
export default function Tabs() {
  const links = [
    { id: 0, path: "/", tab: "Home" },
    { id: 1, path: "/inventory", tab: "Inventory" },
    { id: 2, path: "/purchase", tab: "Purchase" },
    { id: 3, path: "/selling", tab: "Selling" },
    { id: 4, path: "/customers", tab: "Customers" },
  ];

  return (
    <nav className={`bg-amber-100 flex items-center gap-5 h-15 px-10`}>
      {links.map((l, idx) => (
        <NavLink
          key={l.id}
          to={l.path}
          className={({ isActive }) =>
            `nav_link_rout ${isActive ? "isActive" : ""}`
          }
        >
          {l.tab}
        </NavLink>
      ))}
    </nav>
  );
}
