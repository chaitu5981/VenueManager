import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./locationSlice";
import userReducer from "./userSlice";
import { devToolsEnhancer } from "@redux-devtools/extension";
import enquiryReducer from "./enquirySlice";
const store = configureStore({
  reducer: {
    location: locationReducer,
    user: userReducer,
    enquiry: enquiryReducer,
  },

  devTools: true,
});

export default store;
