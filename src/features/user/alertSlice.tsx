import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "Success",
  message: "",
  active: false,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlertDetails: (state, action) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
      state.active = action.payload.active;
    },

    setAlertState: (state) => {
      state.type = "Success";
      state.message = "";
      state.active = false;
    },
  },
});

export const { setAlertDetails, setAlertState } = alertSlice.actions;
export const alertType = (state: any) => state.alert.type;
export const alertMessage = (state: any) => state.alert.message;
export const alertActive = (state: any) => state.alert.active;

export default alertSlice.reducer;
