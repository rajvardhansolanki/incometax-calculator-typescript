import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]:
  {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

type resultProps = {
  newTaxSlab: number,
  annualBasicSalary: number,
  oldRegimeTaxableIncome: number,
  regime: string,
  educationCess: number
}

const Customtable = ({
  newTaxSlab,
  annualBasicSalary,
  oldRegimeTaxableIncome,
  regime,
  educationCess
}: resultProps) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Tax Summary</StyledTableCell>
            <StyledTableCell>Tax Calculation</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell>Income</StyledTableCell>
            <StyledTableCell>
              Rs.
              {" "}
              {annualBasicSalary || "-------"}
              {" "}
            </StyledTableCell>
          </StyledTableRow>
          {
            regime !== "new_regime"
              ? (
                <StyledTableRow>
                  <StyledTableCell>Old Regime Taxable Income</StyledTableCell>
                  <StyledTableCell>
                    Rs.
                    {oldRegimeTaxableIncome || "-------"}
                  </StyledTableCell>
                </StyledTableRow>
              )
              : ""
          }

          <StyledTableRow>
            <StyledTableCell>Tax</StyledTableCell>
            <StyledTableCell>
              Rs.
              {newTaxSlab || "-------"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>Education Cess Tax</StyledTableCell>
            <StyledTableCell>
              Rs.
              {educationCess || "-------"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>Total payable Tax</StyledTableCell>
            <StyledTableCell>
              Rs.
              {newTaxSlab + educationCess || "-------"}
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default Customtable;
