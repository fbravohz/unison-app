/* Importing the React library, the AccountBoxRoundedIcon from the Material UI library, and the
TextField from the Material UI library. */
import React from "react";
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
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
function UserField(props){
/* Defining constants that will be used in the component. */
  const PLACEHOLDER = 'Ingresar usuario';
  const LABEL = 'Usuario';
  const FSIZE = 'large';
  /**
 * Receives the value of the onChange event for the text field and
 * updates the state of useRef object passed in the props as usernameValue.
 * @param value - The changed value of the input field.
 */
  const setUsernameValue = (value) => {
    props.usernameValue.current = value;
  }
  return(
/* Returning a div with a styled icon and a styled text field. */
    <div style={gridFieldStyle}>
      {/* Creating a Material UI icon with the style defined in the iconStyle constant. */}
      <AccountBoxRoundedIcon
        /* A prop that is used to style the icon. */
        sx={iconStyle}
        fontSize={FSIZE}/>
      {/* Creating a text field with the Material UI library. */}
      <TextField
        /* A prop that is used to style the text field. */
        sx={styledField}
        /* An event handler that is called when the value of the text field changes. */
        onChange={(e) => setUsernameValue(e.target.value)}
        label={LABEL}
        placeholder={PLACEHOLDER}
        fullWidth
        required/>
    </div>
  );
}
/* Exporting the UserField function so that it can be imported in other files. */
module.exports = { UserField };