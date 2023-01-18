import React from 'react'
import { Button, Grid, Paper, TextField } from '@mui/material'
import { styled } from '@mui/material/styles';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded';
import KeyIcon from '@mui/icons-material/Key';
import Image from 'next/image'
import logoGrowHill from '/public/logoGrowhillb.png'
import '@fontsource/roboto/300.css';

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
      <LockPersonOutlinedIcon sx={iconStyle} fontSize='large'/>
  )
}

function MyLogo(){
  const imageStyle = {
    margin: 'auto'
  }
  return (
    <Grid item>
      <Image src={logoGrowHill} height={190} width={230} sx={imageStyle}></Image>
    </Grid>
  )
}

function UserField(){
  return(
    <div style={gridFieldStyle}>
      <AccountBoxRoundedIcon sx={iconStyle} fontSize='large'/>
      <StyledTextField label='Usuario' placeholder='Ingresar usuario' fullWidth required/>
    </div>
  );
}

function PasswordField(){
  return(
    <div style={gridFieldStyle}>
      <PasswordRoundedIcon sx={iconStyle} fontSize='large'/>
      <StyledTextField label='Contraseña' placeholder='Ingresar contraseña' type='password' fullWidth required/>
    </div>
  );
}

function MyButton(){
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
        <Button sx={buttonStyle} variant="contained" type="submit" endIcon={<KeyIcon htmlColor='#ffffff'/>}>
          Iniciar sesión
        </Button>
      </div>
    </div>
  );
}

export default function login() {

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

  return (
    <Grid container direction="row" justifyContent='center' alignContent='center'>
      <Paper elevation={5} style={paperStyle}>
        <div style={wrapperStyle}>
          <MyIconTop/>
          <MyLogo/>
          <UserField/>
          <PasswordField/>
          <MyButton/>
        </div>
      </Paper>
    </Grid>
  )
}
