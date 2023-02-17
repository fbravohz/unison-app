/* Importing the React library and the Paper component from the material-ui library. */
import React from "react";
import { Paper } from '@mui/material';
  /* Setting the style of the paper component. */
  const paperStyle = {
    backgroundColor: '#ffffff',
    padding: '100px',
    height: '550px',
    width: '400px',
    margin: '80px'
  };
  /* Setting the style of the div element. */
  const wrapperStyle = {
    margin:'10px',
    display:'grid',
    gridTemplateColumns:'1fr',
    rowGap:'2em',
    justifyItems: 'center'
  };
/**
 * A component that creates a paper-like container
 * @returns A paper-like container with a div element inside of it.
 */
function LoginPaper(props){

  return(
    /* A component that creates a paper-like container. */
    <Paper
      elevation={5}
      style={paperStyle}>
      {/* A React component that creates a div element. The style property is used to set the style of
      the div element. */}
      <div style={wrapperStyle}>
        {props.children}
      </div>
    </Paper>
  );
}
/* Exporting the LoginPaper component so that it can be used in other files. */
module.exports = { LoginPaper };