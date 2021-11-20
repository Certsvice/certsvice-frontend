import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import accountReducer from "../features/user/accountSlice";
import alertReducer from "../features/user/alertSlice";
export default configureStore({
  reducer: {
    account: accountReducer,
    alert: alertReducer,
  },
  middleware: getDefaultMiddleware({
    serializable: false,
  }),
});
