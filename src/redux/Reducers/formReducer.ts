import { createSlice } from "@reduxjs/toolkit";

type TFData = {
  formData: {
    annualBasicSalary: number;
    annualHra: number;
    elss: number;
    homePrincipal: number;
    lic: number;
    ngo: number;
    pf: number;
    politicalDonation: number;
    ppf: number
  };
}

type TState = {
  forms: TFData
}

const initialState = {
  formData: {
    annualBasicSalary: null,
    annualHra: null,
    elss: null,
    homePrincipal: null,
    lic: null,
    ngo: null,
    pf: null,
    politicalDonation: null,
    ppf: null
  }
};

const formReducer = createSlice({
  name: "formData",
  initialState,
  reducers: {
    addFormData: (state, action) => {
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload
        }
      };
    }
  }
});
export const { addFormData } = formReducer.actions;
export default formReducer.reducer;
export const formDataSelect = ({ forms: { formData } }: TState) => formData;
