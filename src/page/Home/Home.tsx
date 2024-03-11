import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import menuItemOptions from "common/cptions";
import { getInputs, inputDataSelect } from "redux/Reducers/inputReducer";
import { addFormData, formDataSelect } from "redux/Reducers/formReducer";
import { Itype } from "common/type";
import {
  newRegime, oldRegime, blockInvalidChar, eightycAmountLimit
} from "common/constant";
import CustomTable from "components/atoms/cutom-table/customTable";
import CustomText from "components/atoms/custom-text/customText";

const Home = () => {
  const dispatch = useDispatch();
  const [regime, setRegime] = useState<string>("new_regime");
  const [newTaxSlab, setnewTaxSlab] = useState<number>(0);
  const [valid, setValid] = useState<boolean>(false);
  const [oldDeduction, setOldDeduction] = useState<number>(0);
  const [educationCess, setEducationCess] = useState<number>(0);
  const data = useSelector(inputDataSelect);
  const formData = useSelector(formDataSelect);

  useEffect(() => {
    dispatch(getInputs());
  }, [dispatch]);

  const {
    annualBasicSalary,
    annualHra,
    elss,
    homePrincipal,
    lic,
    ngo,
    pf,
    politicalDonation,
    ppf
  } = formData || {};

  const {
    formHeading,
    inputs
  }: Itype = data || {};

  const handleChange = useCallback((name: string, val: string) => {
    if (val === "") {
      dispatch(addFormData({
        [name]: null
      }));
      setValid(true);
    } else {
      dispatch(addFormData({
        [name]: parseInt(val)
      }));
    }
  }, [dispatch]);

  const errFun = (item: { mandatory: boolean; eightyc: boolean; eightyd: boolean; eightyggc: boolean; eightyg: boolean; }) => {
    const err = (annualBasicSalary === null && item.mandatory ? valid : false)
      || (!!(item.eightyc && eightycAmountLimit(formData) > 150000))
      || (!!(item.eightyd && lic > 25000))
      || (!!(item.eightyggc && politicalDonation > 50000))
      || (!!(item.eightyg && ngo > 50000));
    return err;
  };

  const errTextFun = (item: { mandatory: boolean; eightyggc: boolean; eightyg: boolean; eightyc: boolean; eightyd: boolean; }) => {
    const errText = (annualBasicSalary === null && item.mandatory ? "This field is required" : "")
      || (item.eightyggc && politicalDonation > 50000 ? "Section Eighty-Ggc Limit Crossed" : "")
      || (item.eightyg && ngo > 50000 ? "Section 80-g limit crossed" : "")
      || (item.eightyc && eightycAmountLimit(formData) > 150000 ? "Section Eighty-C Limit Crossed" : "")
      || (item.eightyd && lic > 25000 ? "Section 80-D Amount Limit Crossed" : " ");
    return errText;
  };

  const maxLength = (item: { mandatory: boolean; eightyggc: boolean; eightyg: boolean; eightyc: boolean; eightyd: boolean; }) => {
    const maxAmount = (item.eightyc && eightycAmountLimit(formData) > 150000 ? 150000 : "")
      || (item.eightyd && lic > 25000 ? 25000 : "")
      || (item.eightyggc && politicalDonation > 50000 ? 50000 : "")
      || (item.eightyg && ngo > 50000 ? 50000 : "");
    return maxAmount;
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (annualBasicSalary !== null && eightycAmountLimit(formData) <= 150000) {
      const oldRegimeDeduction: number = (annualBasicSalary)
        - (annualHra) - (elss) - (homePrincipal)
        - (lic) - (ngo) - (pf) - (politicalDonation) - (ppf);
      const netTax: number = regime === "new_regime" ? newRegime(annualBasicSalary) : oldRegime(oldRegimeDeduction);
      const educationTax: number = netTax * 3 / 100;
      setOldDeduction(oldRegimeDeduction);
      setnewTaxSlab(netTax);
      setEducationCess(educationTax);
    } else {
      setValid(true);
    }
    if (annualBasicSalary < 250000) {
      toast.error("You are not eligible for tax deduction");
    }
  };

  const handleFormType = (event: SelectChangeEvent<string>) => {
    setRegime(event.target.value);
  };

  return (
    <>
      <Container sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px"
      }}
      >
        <Box
          maxWidth="sm"
          sx={{
            bgcolor: "white",
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.4) 0px 30px 90px"
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container sx={{ padding: "18px" }}>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                {
                  inputs !== undefined ? <h3>{formHeading.heading}</h3> : ""
                }
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
                <FormControl sx={{ mt: 2, mb: 2, minWidth: 140 }} size="small">
                  <InputLabel id="demo-select-small">Regime</InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={regime}
                    label="Regime type"
                    onChange={handleFormType}
                  >
                    {
                      menuItemOptions.map(({ value, label }) => (
                        <MenuItem key={value} value={value}>{label}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              {inputs !== undefined
                ? inputs.filter((filter) => (regime === "new_regime" ? filter.filterfield : inputs)).map((item) => {
                  return (
                    <div key={item.id} style={{ width: "inherit" }}>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          display: "flex", justifyContent: "center", alignItems: "center", mt: 0
                        }}
                      >
                        <CustomText
                          onKeyDowns={blockInvalidChar}
                          errors={errFun(item)}
                          helperTexts={errTextFun(item)}
                          types={item.type}
                          labels={item.label}
                          names={item.name}
                          onChanges={handleChange}
                          variants="outlined"
                          autoCompletes="off"
                          maxLength={maxLength(item)}
                        />
                      </Grid>
                      {
                        item.section !== "" && regime !== "new_regime"
                          ? (
                            <Grid item xs={12} sx={{ mb: 1 }}>
                              <small>{item.section}</small>
                            </Grid>
                          )
                          : ""
                      }
                    </div>
                  );
                })
                : ""}
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mb: 2 }}
                >
                  Calculate
                </Button>
              </Grid>
            </Grid>
          </form>

          <Grid container sx={{ padding: "18px" }}>
            <Grid
              item
              xs={12}
              sx={{
                textAlign: "center",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
              }}
            >
              {
                newTaxSlab
                  ? (
                    <CustomTable
                      newTaxSlab={newTaxSlab}
                      annualBasicSalary={annualBasicSalary}
                      oldRegimeTaxableIncome={oldDeduction}
                      regime={regime}
                      educationCess={educationCess}
                    />
                  )
                  : ""
              }
            </Grid>
          </Grid>
        </Box>
      </Container>
      <ToastContainer />
    </>
  );
};
export default Home;
