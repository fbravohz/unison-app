import { React, useRef, useState } from 'react'
import { Alert } from '@mui/material';
import { IconTop } from './IconTop';
import { LogoGrowHill } from './LogoGrowHill';
import { UserField } from './UserField';
import { PasswordField } from './PasswordField';
import { LoginButton } from './LoginButton';
import { LoginGrid } from './LoginGrid';
import {LoginPaper} from './LoginPaper';
import '@fontsource/roboto/300.css';
/**
 * It takes the username and password from the form, sends it to the server, and if the server responds
 * with a 200 status code, it redirects the user to the home page
 * @returns A React component.
 */
function LoginComponent() {
  /* Declaring the variables isAlert, usernameValue and passwordValue. */
    const [isAlert, setAlert] = useState("login");
    const usernameValue = useRef();
    const passwordValue = useRef();
  /**
   * It takes the username and password from the form, sends it to the server, and if the server responds
   * with a 200 status code, it redirects the user to the home page
   * @param event - the event that triggered the function
   */
    const buttonHandler = async (event, setAlert) => {
      /* It prevents the default action of the event from happening. */
      event.preventDefault()
      const endpoint ='/api/auth/login';
  /* Creating a request object that will be sent to the server. */
      const req = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
  /* Creating a JSON object with the username and password that the user entered in the form. */
        body: JSON.stringify({username: usernameValue.current, password: passwordValue.current})
      }
  /* Sending a request to the server. */
      const res = await fetch(endpoint, req);
  /* Checking if the server responded with a 200 status code. If it did, it redirects the user to the
  home page. If it didn't, it shows an error message. */
      if (res.status === 200){
        setAlert("logged");
        window.location.replace('/');
      }
      else
        setAlert("failed");
    }
    /* Returning a React component. */
    return (
      <LoginGrid>
          <LoginPaper>
            <IconTop/>
            <LogoGrowHill/>
            {/* Passing the usernameValue variable to the UserField component. */}
            <UserField usernameValue={usernameValue}/>
            {/* Passing the passwordValue variable to the PasswordField component. */}
            <PasswordField passwordValue={passwordValue}/>
            {/* Passing the buttonHandler function to the MyButton component. */}
            <LoginButton buttonHandler={buttonHandler} setAlert={setAlert}/>
            {/* A conditional rendering. If the value of the isAlert variable is 1, then it renders the alert. */}
            {isAlert == "failed" &&
              <Alert
                severity="error"
                onClose={() => {setAlert("login")}}>
                  Usuario y/o contraseña incorrectos.
              </Alert>
            }
            {/* A conditional rendering. If the value of the isAlert variable is 2, then it renders the alert. */}
            {isAlert == "logged" &&
              <Alert severity="success">
                Sesión iniciada correctamente.
              </Alert>
            }
        </LoginPaper>
      </LoginGrid>
    )
  }

module.exports = { LoginComponent };