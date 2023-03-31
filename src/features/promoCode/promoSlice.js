import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  promoList: [],
  isLoading: false,
  isError: false,
  error: "",
};

export const getAllCode = createAsyncThunk("code/promoCode", async () => {
  const res = await fetch(`${process.env.REACT_APP_DEV_URL}/api/v1/promoCode`);
  const data = await res.json();
  if (data.status === 200) {
    return data;
  }
});

const promoSlice = createSlice({
  name: "promoList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCode.pending, (state, payload) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(getAllCode.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.promoList = payload;
        state.isError = false;
        state.error = "";
      })
      .addCase(getAllCode.rejected, (state, action) => {
        state.isLoading = false;
        state.promoList = "";
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export default promoSlice.reducer;
