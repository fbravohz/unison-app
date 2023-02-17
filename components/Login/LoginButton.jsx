/* Importing the React library, the Button component from the material ui library, and the KeyIcon
component from the material ui icons library. */
import React from "react";
import { Button } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
/* Defining a constant called gridStyle, which is an object with the properties display,
gridTemplateColumns, and margin. */
const gridStyle ={
  display: 'grid', gridTemplateColumns: '3fr',
  margin: 'auto'
};
/* Defining a constant called gridItemStyle, which is an object with the properties gridColumnStart and
gridColumnEnd. */
const gridItemStyle = {
  gridColumnStart: '1', gridColumnEnd: '2'
};
/* Defining a constant called buttonStyle, which is an object with the properties color,
backgroundColor, and &:hover. */
const buttonStyle = {
  color: '#ffffff',
  backgroundColor:'#547b0f',
  '&:hover': {
    backgroundColor:'#6da41d'
  }
};
/**
 * It returns a div with a grid style, which contains a div with a grid item style, which contains a
 * button with a button style, which has an onClick function, a variant, a type, and an endIcon
 * @returns A button with the text "Iniciar sesión" and an icon of a key.
 */
function LoginButton(props){
  return(
    <div style={gridStyle}>
      <div style={gridItemStyle}>
        <Button
          onClick={(e) => props.buttonHandler(e, props.setAlert)}
          sx={buttonStyle}
          variant="contained"
          type="submit"
          endIcon={<KeyIcon htmlColor='#ffffff'/>}>
          Iniciar sesión
        </Button>
      </div>
    </div>
  );
}
/* Exporting the LoginButton function. */
module.exports = { LoginButton }