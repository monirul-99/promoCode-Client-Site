import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../features/api/apiSlice";
import promoSlice from "../features/promoCode/promoSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    promoCodeList: promoSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
