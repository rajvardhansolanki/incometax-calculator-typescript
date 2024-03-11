import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const Navbar = () => {
  return (
    <Box className="navContainer">
      <Grid container>
        <Grid item xs={12} className="logo">
          <h1>Income Tax</h1>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Navbar;
