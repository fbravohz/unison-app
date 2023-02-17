/* Importing the necessary components from the Material UI library. */
import React from 'react';
import Head from 'next/head';
import { IndexDrawer } from "./Drawer/IndexDrawer";
/**
 * The function Home is a React component that takes a user object as a prop and returns a div with a
 * permanent drawer left component that takes a user object as a prop
 * @returns The PermanentDrawerLeft component is being returned.
 */
function IndexComponent( props ) {
  return (
      /* Rendering the PermanentDrawerLeft component and passing the user object to it. */
      <IndexDrawer user={ props.user }/>
  )
}

module.exports = { IndexComponent };