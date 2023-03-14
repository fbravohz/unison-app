/* Importing the necessary components from the Material UI library. */
import React from 'react';
import { Box } from '@mui/system';
import { IndexDrawer } from "./Drawer/IndexDrawer";
/**
 * The function Home is a React component that takes a user object as a prop and returns a div with a
 * permanent drawer left component that takes a user object as a prop
 * @returns The PermanentDrawerLeft component is being returned.
 */
function IndexComponent( props ) {
  return (
      /* Rendering the PermanentDrawerLeft component and passing the user object to it. */
      <Box sx={{ display: 'flex'}}>
        <IndexDrawer user={ props.user }/>
      </Box>
  )
}

module.exports = { IndexComponent };