import React from "react";
import { Avatar,Stack,Toolbar,Typography }from '@mui/material';
/**
 * The UserToolbar function returns a Toolbar component that contains a Stack component that contains
 * an Avatar component and an h4 component
 * @returns A toolbar with a stack of an avatar and a h4 tag.
 */
function UserToolbar( props ){
  return(
    <Toolbar>
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="center">
      <Avatar alt="user">LB
      </Avatar>
      <Typography variant="subtitle1">{ props.fullname }</Typography>
    </Stack>
  </Toolbar>
  );
}

module.exports = { UserToolbar };