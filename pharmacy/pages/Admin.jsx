import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import { addMedicine } from "../store/slices/medicineSlice";

import box_pic from "../src/assets/box.svg";
import up_arrow from "../src/assets/up_arrow.svg";
import users_pic from "../src/assets/users.svg";
import revenu from "../src/assets/revenu.svg";

import Search from "../components/Search";
import MedicinesTable from "../components/MedicinesTable";

export default function Admin() {
  const dispatch = useDispatch();

  const { medicines } = useSelector(
    (state) => state.medicine
  );

  const [showModal, setShowModal] = useState(false);
  const [activeUsers, setActiveUsers] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    getUsersCount();
  }, []);

  const getUsersCount = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/users/count"
      );

      setActiveUsers(res.data.totalUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddMedicine = async () => {
    try {
      setLoading(true);
      setError("");

      await dispatch(addMedicine(formData));

      setSuccess("Medicine added successfully");

      setFormData({
        name: "",
        category: "",
        description: "",
        price: "",
      });

      setTimeout(() => {
        setShowModal(false);
        setSuccess("");
      }, 1500);
    } catch (err) {
      setError("Failed to add medicine");
    } finally {
      setLoading(false);
    }
  };

  const pharmacyData = [
    {
      title: "Total Medicines",
      num: medicines.length,
      logo: box_pic,
    },
    {
      title: "Total Stock",
      num: "550",
      logo: up_arrow,
    },
    {
      title: "Active Users",
      num: activeUsers,
      logo: users_pic,
    },
    {
      title: "Monthly Revenue",
      num: "$12,450",
      logo: revenu,
    },
  ];

  return (
    <div className="container mx-auto mb-10">
      <h1 className="text-center m-10 text-2xl md:text-3xl lg:text-4xl font-bold">
        Admin Dashboard
      </h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-5 max-sm:px-3">
        {pharmacyData.map((item, index) => (
          <div
            key={index}
            className="
              h-28
              rounded-xl
              flex
              justify-between
              items-center
              p-5
              bg-white
              shadow-xl
              shadow-gray-300
            "
          >
            <div className="flex flex-col gap-4">
              <span className="text-gray-600 font-semibold">
                {item.title}
              </span>

              <span className="text-2xl font-bold">
                {item.num}
              </span>
            </div>

            <img
              src={item.logo}
              alt={item.title}
              className="w-12"
            />
          </div>
        ))}
      </div>

      {/* Inventory Section */}
      <div
        className="
          rounded-xl
          flex
          flex-col
          gap-5
          px-2
          py-5
          md:px-5
          bg-white
          shadow-xl
          shadow-gray-300
          max-sm:mx-3
        "
      >
        <div className="w-full flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <span className="text-sm md:text-xl font-bold">
              Inventory Management
            </span>

            <button
              onClick={() => {
                setShowModal(true);
                setError("");
                setSuccess("");
              }}
              className="
                bg-blue-600
                text-white
                px-4
                py-2
                rounded-lg
                hover:bg-blue-700
              "
            >
              + Add Medicine
            </button>
          </div>

          <Search />
        </div>

        <MedicinesTable />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-[90%] max-w-lg rounded-xl p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold">
                Add Medicine
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-xl"
              >
                ✕
              </button>
            </div>

            {success && (
              <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
                {success}
              </div>
            )}

            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                placeholder="Medicine Name"
                value={formData.name}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />

              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />

              <textarea
                name="description"
                placeholder="Description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />

              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="
                  bg-gray-300
                  px-4
                  py-2
                  rounded-lg
                "
              >
                Cancel
              </button>

              <button
                onClick={handleAddMedicine}
                disabled={loading}
                className="
                  bg-blue-600
                  text-white
                  px-4
                  py-2
                  rounded-lg
                  disabled:opacity-50
                "
              >
                {loading ? "Saving..." : "Save Medicine"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}