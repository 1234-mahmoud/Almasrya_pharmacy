import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoggedin: !!localStorage.getItem("token"),
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //login reducer
    login: (state, action) => {
      state.isLoggedin = true;
      state.token = action.payload.token;  // i said i want the token only not all data                                       
      state.user = action.payload.user; // i said i want the user data only && can i do without this line but i write it to show the user name in the header

      localStorage.setItem("token", action.payload.token);

      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },

    //logout reducer
    logout: (state) => {
      state.isLoggedin = false;
      state.token = null;
      state.user = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const {login,logout} = authSlice.actions;
export default authSlice.reducer;



/*
يعني إيه action؟

لما تعمل:

dispatch(login({ token: "abc123", user: {...} }))

Redux بيبعت حاجة اسمها Action شكلها كده:

{
  type: "auth/login",
  payload: {
    token: "abc123",
    user: {...}
  }
}
*/