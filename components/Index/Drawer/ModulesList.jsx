import React, { useContext } from "react";
import { ListItemButton,ListItemIcon,ListItemText,ListItem,List }from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { ModulesObjectArray } from './ModulesObjectArray';
import { useRouter } from "next/router";
import { SelectedModule } from './../Context';

/**
 * Create a list of modules, that will contain the name of the module and an icon
 * @returns A react component of a list of modules.
 */

function ModulesList( ){

  return (
    <List>
      {ModulesObjectArray.map((obj) => {
        return (
          <ListItemButtonWrapper key={obj.label} label={obj.label} icon={obj.icon} subitems={obj.subitems}/>
        )
      })}
    </List>
  )
}

function ListItemButtonWrapper({ label, icon, subitems }){
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  }
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText  primary={label}/>
        {open ? <ExpandLess/> : <ExpandMore/>}
      </ListItemButton>
      <CollapseSubItems subitems={subitems} state={open}/>
    </>
  );
}

function CollapseSubItems({ subitems, state}){
  const [selectedModule, setSelectedModule] = useContext(SelectedModule);
  const router = useRouter();
  function handleClick(route, label){
    setSelectedModule(label);
    router.push(route);
  }
  return (
    <>
      <Collapse in={state} timeout="auto" unmountOnExit>
        <List>
          {subitems ?
          subitems.map((subitem)=> {
          return(
            <ListItemButton key={subitem.label} sx={{ pl: 4 }} onClick={() => handleClick(subitem.route, subitem.label)} selected={selectedModule === subitem.label}>
            <ListItemIcon>
              {subitem.icon}
            </ListItemIcon>
            <ListItemText  primary={subitem.label}/>
          </ListItemButton>
          )})
          : null}
        </List>
      </Collapse>
    </>
  );
}


module.exports = { ModulesList };



