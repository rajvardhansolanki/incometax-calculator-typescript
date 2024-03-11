import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getInputsData } from "common/constant";
import { Itype } from "common/type";
import jsonData from "json/dynamicData.json";

type TIData = {
  inputData: Itype
}

type TState = {
  inputs: TIData;
}

export const getInputs: any = createAsyncThunk(
  "input/getInputs",
  async () => {
    return getInputsData(jsonData);
  }
);

const initialState: any = {
  inputData: [],
  isLoading: true
};

const inputReducer = createSlice({
  name: "input",
  initialState,
  reducers: {
    // addInputData: (state, action) => {
    //   return {
    //     ...state,
    //     inputData: {
    //       ...state.inputData,
    //       ...action.payload
    //     }
    //   };
    //   // state.inputData = action.payload;
    // }
  },
  extraReducers: {
    [getInputs.pending]: (state: any, action: any) => {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = true;
    },
    [getInputs.fulfilled]: (state: any, action: any) => {
      // eslint-disable-next-line no-param-reassign
      state.inputData = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
    }
  }
});
// export const { addInputData } = inputReducer.actions;
export default inputReducer.reducer;
export const inputDataSelect = ({ inputs: { inputData } }: TState) => inputData;
