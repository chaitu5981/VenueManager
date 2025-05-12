import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  venue: null,
  subVenues: [],
};
export const registerVenue = createAsyncThunk(
  "venue/register",
  async (venueData, thunkApi) => {
    try {
      const { data } = await axios.post(
        "https://vm-backend-6fd25b5f6201.herokuapp.com/v1/users/venueRegistration",
        venueData
      );
      return data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const venueSlice = createSlice({
  name: "venue",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerVenue.pending, (state, action) => {
        state.loading = true;
        state.venue = null;
        state.error = null;
      })
      .addCase(registerVenue.fulfilled, (state, action) => {
        state.loading = false;
        const { message, ...rest } = action.payload.data;
        state.venue = rest;
        state.error = null;
      })
      .addCase(registerVenue.rejected, (state, action) => {
        state.loading = false;
        state.venue = null;
      });
  },
});

export default venueSlice.reducer;
