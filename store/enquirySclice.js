import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  enquiry: null,
  events: [],
};

export const getEnquiryInfo = createAsyncThunk(
  "enquiry/getEnquiryInfo",
  async (enquiryId, thunkApi) => {
    try {
      const { data } = await axios(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/v1/enquiry/getEnquiryDetails?enquiry_id=${enquiryId}`
      );
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue("Internal Error");
    }
  }
);

const enquirySlice = createSlice({
  name: "enquiry",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getEnquiryInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEnquiryInfo.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status_code == 200) {
          const { user_info, venue_info, subvenue_info } = action.payload;
          state.error = null;
          state.user = user_info;
          state.venue = venue_info;
          state.subVenues = subvenue_info;
        } else {
          state.error = action.payload.message;
          state.user = null;
        }
      })
      .addCase(getUserInfo.rejected, (state) => {
        state.loading = false;
        state.error = "Internal Error";
        state.user = null;
        state.venue = null;
        state.subVenues = [];
      })
      .addCase(getRoomsInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRoomsInfo.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.status_code == 200) state.rooms = payload.rooms;
        else {
          state.rooms = [];
          state.error = payload.message;
        }
      })
      .addCase(getRoomsInfo.rejected, (state) => {
        state.loading = false;
        state.error = "Internal Error";
        state.rooms = [];
      });
  },
});
