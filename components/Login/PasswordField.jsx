/* Importing the React library, the AccountBoxRoundedIcon from the Material UI library, and the
TextField from the Material UI library. */
import React from "react";
import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded';
import { TextField } from '@mui/material';
/* Defining a constant that will be used to style the icon. */
const iconStyle ={
  margin: 'auto',
  color: '#547b0f',
  '&:hover':{color:'#6da41d'}
}
/* Defining a constant that will be used to style the div that contains the icon and the text field. */
const gridFieldStyle = {
  margin: 'auto',
  display: 'grid',
  gridTemplateColumns: '1fr 11fr'
}
/* Defining a constant that will be used to style the text field. */
const styledField = {
  '& label.Mui-focused': {
    color: '#537b0f',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#537b0f',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#6da41d',
    },
    '&:hover fieldset': {
      borderColor: '#dac900',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#537b0f',
    },
  },
}
/**
 * It returns a div with a Material UI icon and a Material UI text field
 * @returns A div with a styled icon and a styled text field.
 */
function PasswordField(props){
  /* Defining constants that will be used in the component. */
  const PLACEHOLDER = 'Ingresar contraseña';
  const LABEL = 'Contraseña';
  const FSIZE = 'large';
  const TYPE = 'password';
  /**
 * Receives the value of the onChange event for the text field and
 * updates the state of useRef object passed in the props as passwordValue.
 * @param value - The changed value of the input field.
 */
  function setPasswordValue(value){
    props.passwordValue.current = value;
  }
  return(
/* Creating a div with a styled icon and a styled text field. */
    <div style={gridFieldStyle}>
      {/* Creating a PasswordRoundedIcon component from the Material UI library. */}
      <PasswordRoundedIcon
        /* Passing the iconStyle constant to the sx prop of the PasswordRoundedIcon component. */
        sx={iconStyle}
        fontSize={FSIZE}/>
      {/* Creating a TextField component from the Material UI library. */}
      <TextField
        /* Passing the styledField constant to the sx prop of the TextField component. */
        sx={styledField}
        /* Calling the setPasswordValue function and passing the value of the input field as a parameter. */
        onChange={(e) => setPasswordValue(e.target.value)}
        label={LABEL}
        placeholder={PLACEHOLDER}
        fullWidth
        type={TYPE}
        required/>
    </div>
  );
}
  /* Exporting the UserField function so that it can be imported in other files. */
  module.exports = { PasswordField };
