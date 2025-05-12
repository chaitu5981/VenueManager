import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./locationSlice";
import authReducer from "./authSlice";
import venueReducer from "./venueSlice";
const store = configureStore({
  reducer: {
    location: locationReducer,
    auth: authReducer,
    venue: venueReducer,
  },
});

export default store;
