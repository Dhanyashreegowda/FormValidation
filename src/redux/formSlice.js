import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vendorDetails: {},
  bankDetails: {},
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setVendorDetails: (state, action) => {
      state.vendorDetails = action.payload;
    },
    setBankDetails: (state, action) => {
      state.bankDetails = action.payload;
    },
  },
});

export const { setVendorDetails, setBankDetails } = formSlice.actions;
export default formSlice.reducer;
