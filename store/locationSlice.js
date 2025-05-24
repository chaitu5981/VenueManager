import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
  countries: [],
  states: [],
  cities: [],
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
export const fetchStates = createAsyncThunk(
  "location/getStates",
  async (countryId, thunkApi) => {
    try {
      const { data } = await axios(
        `https://vm-backend-6fd25b5f6201.herokuapp.com/v1/users/stateList?country_id=${countryId}`
      );
      return data.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const fetchCities = createAsyncThunk(
  "location/getCities",
  async (stateId, thunkApi) => {
    console.log(stateId);
    try {
      const { data } = await axios(
        `https://vm-backend-6fd25b5f6201.herokuapp.com/v1/users/cityList?state_id=${stateId}`
      );
      return data.data;
    } catch (error) {
      console.log(error);
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
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
        state.error = null;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.countries = [];
      })
      .addCase(fetchStates.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchStates.fulfilled, (state, action) => {
        state.loading = false;
        state.states = action.payload;
        state.error = null;
      })
      .addCase(fetchStates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.states = [];
      })
      .addCase(fetchCities.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
        state.error = null;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.cities = [];
      });
  },
});

export default locationSlice.reducer;
