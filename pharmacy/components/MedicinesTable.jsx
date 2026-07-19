import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchMedicines,
  updateMedicine,
  deleteMedicine,
} from "../store/slices/medicineSlice";

import { RiPencilLine, RiDeleteBinLine } from "react-icons/ri";
import EditMedicineModal from "./EditMedicineModal";

export default function MedicinesTable() {
  const dispatch = useDispatch();

  const { medicines } = useSelector((state) => state.medicine);

  useEffect(() => {
    dispatch(fetchMedicines());
  }, [dispatch]);

  const [selectedMedicine, setSelectedMedicine] = useState(null);

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-3">Medicine Name</th>
            <th className="py-3">Category</th>
            <th className="py-3">Description</th>
            <th className="py-3">Price</th>
            <th className="py-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {medicines.length > 0 ? (
            medicines.map((medicine) => (
              <tr key={medicine.id} className="border-b border-gray-200">
                <td className="py-3 text-center">{medicine.name}</td>

                <td className="py-3 text-center">{medicine.category}</td>

                <td className="py-3 text-center">{medicine.description}</td>

                <td className="py-3 text-center">${medicine.price}</td>

                <td className="py-3">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => setSelectedMedicine(medicine)}>
                      <RiPencilLine className="w-6 h-6" color="#f59e0b" />
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm("Delete this medicine?")) {
                          dispatch(deleteMedicine(medicine.id));
                        }
                      }}
                    >
                      <RiDeleteBinLine className="w-6 h-6" color="#ef4444" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-8 text-center text-gray-500">
                No medicines found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedMedicine && (
        <EditMedicineModal
          medicine={selectedMedicine}
          onClose={() => setSelectedMedicine(null)}
          onSave={(data) => {
            dispatch(
              updateMedicine({
                id: selectedMedicine.id,
                data,
              }),
            );

            setSelectedMedicine(null);
          }}
        />
      )}
    </div>
  );
}
