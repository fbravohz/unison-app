import React from "react";
import { Grid } from '@mui/material';
/**
 * A container that centers the content of the page
 * @returns A Grid component that centers the content of the page.
 */
function LoginGrid(props){
  /* A container that centers the content of the page. */
  return(
    <Grid
    container direction="row"
    justifyContent='center'
    alignContent='center'>
    {props.children}
    </Grid>
  );
}
/* Exporting the `LoginGrid` function so that it can be imported into other files. */
module.exports = { LoginGrid };