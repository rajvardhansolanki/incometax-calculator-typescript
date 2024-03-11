import { configureStore } from "@reduxjs/toolkit";
import FormReducer from "./redux/Reducers/formReducer";
import InputReducer from "./redux/Reducers/inputReducer";

const store = configureStore({
  reducer: {
    inputs: InputReducer,
    forms: FormReducer
  }
});
export default store;
