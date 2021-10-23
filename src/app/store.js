import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import accountReducer from "../features/user/accountSlice";
export default configureStore({
  reducer: {
    account: accountReducer,
  },
  middleware: getDefaultMiddleware({
    serializable: false,
  }),
});
