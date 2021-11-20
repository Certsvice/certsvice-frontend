import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wallet: "",
  photo: "",
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccountConectDetails: (state, action) => {
      state.wallet = action.payload.wallet;
      state.photo = action.payload.photo;
    },

    setAccountDisconectState: (state) => {
      state.wallet = "";
      state.photo = "";
    },
  },
});

export const { setAccountConectDetails, setAccountDisconectState } =
  accountSlice.actions;
export const selectWalletAddress = (state: any) => state.account.wallet;
export const selectWalletPhoto = (state: any) => state.account.photo;

export default accountSlice.reducer;
