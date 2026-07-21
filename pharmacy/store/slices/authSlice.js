import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";

const initialState = {
  loading: false,
  message: "",
  isSuccess: false,
  isLoggedin: !!localStorage.getItem("token"),
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
};

// Forgot Password
export const requestPasswordReset = createAsyncThunk(
  "auth/requestPasswordReset",
  async (email, thunkAPI) => {
    try {
      const response = await API.post(
        "/api/auth/forgot-password",
        {
          email,
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// Reset Password
export const confirmPasswordReset = createAsyncThunk(
  "auth/confirmPasswordReset",
  async ({ token, password }, thunkAPI) => {
    try {
      const response = await API.post(
        `/api/auth/reset-password/${token}`,
        {
          password,
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    login: (state, action) => {
      state.isLoggedin = true;
      state.token = action.payload.token;
      state.user = action.payload.user;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem(
        "user",
        JSON.stringify(action.payload.user)
      );
    },

    logout: (state) => {
      state.isLoggedin = false;
      state.token = null;
      state.user = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    clearMessage: (state) => {
      state.message = "";
      state.isSuccess = false;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(requestPasswordReset.pending, (state) => {
        state.loading = true;
        state.message = "";
        state.isSuccess = false;
      })

      .addCase(
        requestPasswordReset.fulfilled,
        (state, action) => {
          state.loading = false;
          state.isSuccess = true;
          state.message = action.payload.message;
        }
      )

      .addCase(
        requestPasswordReset.rejected,
        (state, action) => {
          state.loading = false;
          state.isSuccess = false;
          state.message = action.payload;
        }
      )

      .addCase(confirmPasswordReset.pending, (state) => {
        state.loading = true;
        state.message = "";
        state.isSuccess = false;
      })

      .addCase(
        confirmPasswordReset.fulfilled,
        (state, action) => {
          state.loading = false;
          state.isSuccess = true;
          state.message = action.payload.message;
        }
      )

      .addCase(
        confirmPasswordReset.rejected,
        (state, action) => {
          state.loading = false;
          state.isSuccess = false;
          state.message = action.payload;
        }
      );
  },
});

export const {
  login,
  logout,
  clearMessage,
} = authSlice.actions;

export default authSlice.reducer;