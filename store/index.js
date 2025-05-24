import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./locationSlice";
import userReducer from "./userSlice";
import venueReducer from "./venueSlice";
const store = configureStore({
  reducer: {
    location: locationReducer,
    user: userReducer,
  },
});

export default store;
