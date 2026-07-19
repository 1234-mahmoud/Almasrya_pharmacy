import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMedicines = createAsyncThunk(
  "medicines/fetchMedicines",
  async () => {
    const res = await axios.get("http://localhost:5000/api/medicines");
    return res.data;
  },
);

export const addMedicine = createAsyncThunk(
  "medicines/addMedicine",
  async (medicine) => {
    const res = await axios.post(
      "http://localhost:5000/api/medicines",
      medicine,
    );
    return res.data.medicine;
  },
);

export const updateMedicine = createAsyncThunk(
  "medicine/updateMedicine",
  async ({ id, data }) => {
    const response = await axios.put(`http://localhost:5000/api/medicines/${id}`, data);
// console.log("Response:", response.data);
    return response.data;
  },
);

export const deleteMedicine = createAsyncThunk(
  "medicine/deleteMedicine",
  async (id) => {
    await axios.delete(`http://localhost:5000/api/medicines/${id}`);
    return id;
  },
);

const medicineSlice = createSlice({
  name: "medicines",
  initialState: {
    medicines: [],
    searchTerm: "",
    loading: false,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedicines.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchMedicines.fulfilled, (state, action) => {
        state.loading = false;
        state.medicines = action.payload;
      })

      .addCase(addMedicine.fulfilled, (state, action) => {
        state.medicines.unshift(action.payload);
      })

      .addCase(updateMedicine.fulfilled, (state, action) => {
        state.medicines = state.medicines.map((medicine) =>
          medicine.id === action.payload.id ? action.payload : medicine,
        );
      })

      .addCase(deleteMedicine.fulfilled, (state, action) => {
        state.medicines = state.medicines.filter(
          (medicine) => medicine.id !== action.payload,
        );
      });
  },
});
export const { setSearchTerm } = medicineSlice.actions;
export default medicineSlice.reducer;
