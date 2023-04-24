import React, { useContext } from "react";
import { ListItemButton,ListItemIcon,ListItemText,ListItem,List }from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { ModulesObjectArray } from './ModulesObjectArray';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSubModule } from "/store/selectModuleSlice.js"
import { setSelectedModule } from "../../../store/selectModuleSlice";

/**
 * Create a list of modules, that will contain the name of the module and an icon
 * @returns A react component of a list of modules.
 */

function ModulesList( ){
  return (
    <List>
      {ModulesObjectArray.map((obj) => {
        return (
          <ListItemButtonWrapper
            key={obj.label}
            label={obj.label}
            icon={obj.icon}
            subitems={obj.subitems}
          />
        )
      })}
    </List>
  )
}

function ListItemButtonWrapper({ label, icon, subitems }){
  const selectedModule = useSelector(state => state.selectModule.selectedModule);
  const dispatch = useDispatch()
  const handleClick = (label) => {
    selectedModule === label
    ? dispatch(setSelectedModule(null))
    : dispatch(setSelectedModule(label))
  }
  return (
    <>
      <ListItemButton onClick={() => handleClick(label)}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={label}/>
        {selectedModule === label ? <ExpandLess/> : <ExpandMore/>}
      </ListItemButton>
      <CollapseSubItems
        subitems={subitems}
        isOpen={selectedModule === label}
      />
    </>
  );
}

function CollapseSubItems({ subitems, isOpen}){
  const selectedSubModule = useSelector(state => state.selectModule.selectedSubModule);
  const dispatch = useDispatch()
  const router = useRouter();
  function handleClick(route, label){
    dispatch(setSelectedSubModule(label));
    router.push(route);
  }
  return (
    <>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List>
          {subitems ?
          subitems.map((subitem)=> {
          return(
            <ListItemButton
              key={subitem.label}
              sx={{ pl: 4 }}
              onClick={() => handleClick(subitem.route, subitem.label)}
              selected={selectedSubModule === subitem.label}
            >
              <ListItemIcon>
                {subitem.icon}
              </ListItemIcon>
              <ListItemText
                primary={subitem.label}
              />
            </ListItemButton>
          )})
          : null}
        </List>
      </Collapse>
    </>
  );
}


module.exports = { ModulesList };



