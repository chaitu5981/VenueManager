import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  enquiries: [],
  currEnquiry: null,
};

export const getAllEnquiries = createAsyncThunk(
  "enquiry/getAllEnquiries",
  async ({ userId, noOfRows, page, status }, thunkApi) => {
    try {
      const { data } = await axios(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/v1/enquiry/getAllEnquiry?user_id=${userId}&page=${page}&no_of_rows=${noOfRows}&status=${status}`
      );
      return data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue("Internal Error");
    }
  }
);
export const getEnquiryDetails = createAsyncThunk(
  "enquiry/getEnquiryDetails",
  async (enquiryId, thunkApi) => {
    try {
      const { data } = await axios(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/v1/enquiry/getEnquiryDetails?enquiry_id=${enquiryId}`
      );
      return data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue("Internal Error");
    }
  }
);
const enquirySlice = createSlice({
  name: "enquiry",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getAllEnquiries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEnquiries.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.status_code == 200) {
          state.enquiries = payload.data;
        } else {
          state.error = payload.message;
          state.enquiries = [];
        }
      })
      .addCase(getAllEnquiries.rejected, (state) => {
        state.loading = false;
        state.error = "Internal Error";
        state.enquiries = [];
      })
      .addCase(getEnquiryDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        currEnquiry = null;
      })
      .addCase(getEnquiryDetails.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.status_code == 200) {
          const { status_code, ...rest } = payload;
          state.currEnquiry = rest;
        } else {
          state.error = payload.message;
          state.currEnquiry = null;
        }
      })
      .addCase(getEnquiryDetails.rejected, (state) => {
        state.loading = false;
        state.error = "Internal Error";
        state.currEnquiry = null;
      });
  },
});

export default enquirySlice.reducer;
