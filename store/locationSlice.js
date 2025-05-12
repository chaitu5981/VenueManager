import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
  countries: [],
  error: null,
};
export const fetchCountries = createAsyncThunk(
  "location/getCountries",
  async (_, thunkApi) => {
    try {
      const { data } = await axios(
        "https://vm-backend-6fd25b5f6201.herokuapp.com/v1/users/countryList"
      );
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
const locationSlice = createSlice({
  name: "location",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state, action) => {
        state.loading = true;
        state.countries = [];
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        (state.loading = false), (state.countries = action.payload);
        state.error = null;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.countries = [];
      });
  },
});

export default locationSlice.reducer;
