import React from "react";
import {ListItemButton,ListItemIcon,ListItemText,ListItem }from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
/**
 * It sends a POST request to the server, which logs the user out, and then reloads the page
 * @returns A button that logs the user out.
 */
function LogoutButton(){
  /**
   * It sends a POST request to the server, which logs the user out, and then reloads the page
   */
    const logoutHandler = async (event) => {
      event.preventDefault()
      const req = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: ''
      }
      const res = await fetch('/api/auth/logout', req)
      if (res) window.location.reload();
    }
  /* A button that logs the user out. */
    return(
        <ListItem key={1} disablePadding>
          <ListItemButton onClick={logoutHandler}>
            <ListItemIcon>
              <LogoutIcon/>
            </ListItemIcon>
            <ListItemText primary={'Cerrar sesión'} />
          </ListItemButton>
        </ListItem>
    )
  }

module.exports = { LogoutButton };