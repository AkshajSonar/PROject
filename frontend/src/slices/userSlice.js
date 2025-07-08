import { createSlice } from "@reduxjs/toolkit";

// Load user from localStorage if present
const storedUser = localStorage.getItem("user");
const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // persist
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // clear
    },
    updateUserField: (state, action) => {
      const { field, value } = action.payload;
      if (state.user) {
        state.user[field] = value;
        localStorage.setItem("user", JSON.stringify(state.user)); // persist
      }
    },
  },
});

export const { setUser, clearUser, updateUserField } = userSlice.actions;
export default userSlice.reducer;
