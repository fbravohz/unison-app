import React from "react";
import { ListItemButton,ListItemIcon,ListItemText,ListItem,List }from '@mui/material';
import LabelIcon from '@mui/icons-material/Label';
/**
 * Create a list of modules, that will contain the name of the module and an icon
 * @returns A react component of a list of modules.
 */
function ModulesList( props ){
  const modulesList = props.modulesList;
  return (
    <List>
    {/* Creating a list of items. */
    modulesList.map((text, index) => (
      <ListItem key={text} disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <LabelIcon/>
          </ListItemIcon>
          {/* Passing the text to the ListItemText component. */}
          <ListItemText  primary={text}/>
        </ListItemButton>
      </ListItem>
    ))}
    </List>
  )
}

module.exports = { ModulesList };