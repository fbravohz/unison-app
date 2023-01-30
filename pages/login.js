import React, { useEffect, useRef } from 'react'
import { Alert, Button, Grid, Paper, TextField } from '@mui/material'
import { styled } from '@mui/material/styles';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded';
import KeyIcon from '@mui/icons-material/Key';
import Image from 'next/image'
import logoGrowHill from '/public/logoGrowhillb.png'
import '@fontsource/roboto/300.css';
import { useRouter } from 'next/router'
import { useState } from 'react'
import { NextResponse } from 'next/server'
import { sendEtagResponse } from 'next/dist/server/send-payload';


const iconStyle ={
  margin: 'auto',
  color: '#547b0f',
  '&:hover':{color:'#6da41d'}
}

const gridFieldStyle = {
  margin: 'auto',
  display: 'grid',
  gridTemplateColumns: '1fr 11fr'
}

const StyledTextField = styled(TextField)({
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
});

function MyIconTop(){
  return (
      <LockPersonOutlinedIcon
        sx={iconStyle}
        fontSize='large'
      />
  )
}

function MyLogo(){
  const imageStyle = {
    margin: 'auto'
  }
  return (
    <Grid item>
      <Image
        src={logoGrowHill}
        alt='growhill-logo'
        height={190}
        width={230}
        sx={imageStyle}
      />
    </Grid>
  )
}

function UserField(props){
/**
 * It sets the value of the usernameValue property of the props object to the value passed in as an
 * argument
 * @param value - The value of the input field.
 */
  const setUsernameValue = (value) => {
    props.usernameValue.current = value;
  }
  return(
    <div style={gridFieldStyle}>
      <AccountBoxRoundedIcon
        sx={iconStyle}
        fontSize='large'
      />
      <StyledTextField
        onChange={(e) => setUsernameValue(e.target.value)}
        label='Usuario'
        placeholder='Ingresar usuario'
        fullWidth
        required
      />
    </div>
  );
}

function PasswordField(props){
  function setPasswordValue(value){
    props.passwordValue.current = value;
  }
  return(
    <div style={gridFieldStyle}>
      <PasswordRoundedIcon
        sx={iconStyle}
        fontSize='large'/>
      <StyledTextField
        onChange={(e) => setPasswordValue(e.target.value)}
        label='Contraseña'
        placeholder='Ingresar contraseña'
        type='password'
        fullWidth
        required/>
    </div>
  );
}

function MyButton(props){
  const gridStyle ={
    display: 'grid', gridTemplateColumns: '3fr',
    margin: 'auto'
  };
  const gridItemStyle = {
    gridColumnStart: '1', gridColumnEnd: '2'
  };
  const buttonStyle = {
    color: '#ffffff',
    backgroundColor:'#547b0f',
    '&:hover': {
      backgroundColor:'#6da41d'
    }
  };
  return(
    <div style={gridStyle}>
      <div style={gridItemStyle}>
        <Button
          onClick={(e) => props.onClick(e)}
          sx={buttonStyle}
          variant="contained"
          type="submit"
          endIcon={
            <KeyIcon
              htmlColor='#ffffff'
            />
          }
        >
          Iniciar sesión
        </Button>
      </div>
    </div>
  );
}

export default function Login() {

  const paperStyle = {
    backgroundColor: '#ffffff',
    padding: '100px',
    height: '550px',
    width: '400px',
    margin: '80px'
  };

  const wrapperStyle = {
    margin:'10px',
    display:'grid',
    gridTemplateColumns:'1fr',
    rowGap:'2em',
    justifyItems: 'center'
  };
  const [isAlert, setAlert] = useState(0);
  const usernameValue = useRef();
  const passwordValue = useRef();

/**
 * It takes the username and password from the form, sends it to the server, and if the server responds
 * with a 200 status code, it redirects the user to the home page
 * @param event - the event that triggered the function
 */
  const buttonHandler = async (event) => {
    event.preventDefault()
    const endpoint ='/api/auth/login';
    const req = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: usernameValue.current, password: passwordValue.current})
    }
    const res = await fetch(endpoint, req);
    if (res.status === 200){
      setAlert(2);
      window.location.replace('/');
    }
    else
      setAlert(1);
  }

  /* Returning a React component. */
  return (
    /* A container that centers the content of the page. */
    <Grid
      container direction="row"
      justifyContent='center'
      alignContent='center'>
      {/* A component that creates a paper-like container. */}
      <Paper
        elevation={5}
        style={paperStyle}>
        {/* A React component that creates a div element. The style property is used to set the style of
        the div element. */}
        <div style={wrapperStyle}>
          <MyIconTop/>
          <MyLogo/>
          {/* Passing the usernameValue variable to the UserField component. */}
          <UserField usernameValue={usernameValue}/>
          {/* Passing the passwordValue variable to the PasswordField component. */}
          <PasswordField passwordValue={passwordValue}/>
          {/* Passing the buttonHandler function to the MyButton component. */}
          <MyButton onClick={buttonHandler}/>
          {/* A conditional rendering. If the value of the isAlert variable is 1, then it renders the alert. */}
          {isAlert == 1 &&
            <Alert
              severity="error"
              onClose={() => {setAlert(0)}}>
                Usuario y/o contraseña incorrectos.
            </Alert>
          }
          {/* A conditional rendering. If the value of the isAlert variable is 2, then it renders the alert. */}
          {isAlert == 2 &&
            <Alert severity="success">
              Sesión iniciada correctamente.
            </Alert>
          }
        </div>
      </Paper>
    </Grid>
  )
}

/**
 * If the user is logged in, redirect them to the home page
 * @returns an object with a property called props.
 */
export async function getServerSideProps( {req} ) {
/* Checking if the user is logged in. If they are, it redirects them to the home page. */
  if(req.cookies.growhillSession !== undefined)
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
/* Returning an object with a property called props. */
  else
    return { props: { } }
}