import React from "react";
import {Divider, Drawer }from '@mui/material';
import { UserToolbar } from './UserToolbar';
import { ModulesList } from './ModulesList';
import { LogoutButton } from './LogoutButton';

const modules = [{icon: null,label: 'Usuarios'}, {icon: null,label: 'Usuarios2'}, {icon: null,label: 'Usuarios3'}, {icon: null,label: 'Usuarios4'}]

/**
 * A React component that returns a Drawer
 * @returns A Drawer component.
 */
function IndexDrawer ( props ) {
/* A React component that returns a Drawer. */
  return (
    <Drawer
      /* A style object that is passed to the Drawer component. */
      sx={{
        width: 300,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 300,
          boxSizing: 'border-box',
          // background: '#73777d',
        },
      }}
      variant="permanent"
      anchor="left">
      {/* Passing the fullname of the user to the UserToolbar component. */}
      <UserToolbar fullname={props?.user?.fullname}/>
      <Divider/>
      {/* A list of modules that the user can access. */}
      <ModulesList/>
      <Divider/>
      {/* It sends a POST request to the server, which logs the user out, and then reloads the page. */}
      <LogoutButton/>
      <Divider/>
    </Drawer>
  );
}
/* Exporting the PermanentDrawerLeft function. */
module.exports = { IndexDrawer };