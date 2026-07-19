import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedicines } from "../store/slices/medicineSlice";
import { addToCart } from "../store/slices/cartSlice";

export default function Medicines({ selectedCategory }) {
  const dispatch = useDispatch();

  // use Redux instead of local state
  const { medicines } = useSelector((state) => state.medicine);
  const searchTerm = useSelector((state) => state.medicine.searchTerm);

  useEffect(() => {
    dispatch(fetchMedicines());
  }, [dispatch]);

  const filteredMedicines = medicines
    .filter((m) => m.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((m) => selectedCategory ? m.category === selectedCategory : true); // ✅ category filter

  return (
    <div
      className="
      grid
      grid-cols-1
      md:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
      gap-4
      py-4
    "
    >
      {filteredMedicines.map((medicine) => (
        <div
          key={medicine.id}
          className="
            w-full
            h-50
            rounded-xl
            flex
            flex-col
            gap-5
            justify-center
            px-3
            md:px-5
            bg-white
            border
            border-gray-300
          "
        >
          <div className="flex flex-col gap-5">
            <span className="flex flex-col gap-3">
              <span className="text-lg md:text-xl font-bold">
                {medicine.name}
              </span>

              <span className="bg-blue-100 text-blue-600 w-fit px-3 rounded-lg">
                {medicine.category}
              </span>

              <span className="text-md text-gray-600">
                {medicine.description}
              </span>
            </span>
          </div>

          <div className="flex justify-between items-center w-full">
            <span className="text-xl font-bold text-blue-600">
              ${medicine.price}
            </span>

            <button onClick={()=>dispatch(addToCart(medicine))} className="bg-blue-600 text-white font-bold p-2 rounded-md">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
