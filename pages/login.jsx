/* Importing the LoginComponent from the login folder. */
import React from 'react'
import { LoginComponent } from './../components/Login/LoginComponent';
/**
 * It returns a component called LoginComponent
 * @returns The LoginComponent is being returned.
 */
export default function Login(){
  return(
    <LoginComponent/>
  );
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

