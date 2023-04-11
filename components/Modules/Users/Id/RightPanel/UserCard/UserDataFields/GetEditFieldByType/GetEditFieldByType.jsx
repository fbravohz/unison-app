import React from "react";
import { Typography, TextField, Select, MenuItem,
  Chip, IconButton, OutlinedInput } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { updateUsername, updateFullname, updatePassword, updateHireDate,
  updateCompany, updatePosition, updateUserProfile, updateUserState } from '/store/editUserSlice';
import styles from './GetEditFieldByType.module.css'
import { Visibility, VisibilityOff } from "@mui/icons-material";

const staticInput = (data, action) => {
  return <StaticInput data={data}/>
}
const textInput = (data, action) => {
  return <TextInput data={data} action={action}/>
}
const passwordInput = (data, action) => {
  return <PasswordInput action={action}/>
}
const datePicker = (data, action) => {
  return <DatePicker data={data} action={action}/>
}
const dropdownList = (data, action, objectName) => {
  return <DropdownList data={data} action={action} objectName={objectName}/>
}

const fieldTypeByName = {
  'ID': {
    function: staticInput
  },
  'Nombre completo': {
    function: textInput,
    action: updateFullname
  },
  'Usuario': {
    function: textInput,
    action: updateUsername
  },
  'Contraseña': {
    function: passwordInput,
    action: updatePassword
  },
  'Contratación':  {
    function: datePicker,
    action: updateHireDate
  },
  'Compañia': {
    function: dropdownList,
    action: updateCompany
  },
  'País': {
    function: staticInput
  },
  'Posición': {
    function: dropdownList,
    action: updatePosition
  },
  'Perfil de usuario': {
    function: dropdownList,
    action: updateUserProfile
  },
  'Estado': {
    function: dropdownList,
    action: updateUserState
  },
};

export default function GetEditFieldByType({ fieldName, fieldUserData, fieldObjectName }) {
  const funct = fieldTypeByName[fieldName]?.function
  const action = fieldTypeByName[fieldName]?.action
  return typeof funct ==='function' ? funct(fieldUserData, action, fieldObjectName) : null;
}

function StaticInput({ data }){
  return (
    <Chip
      variant="outlined"
      className={styles.userDataFieldChip}
      label={
        <Typography
          className={styles.userDataFieldChipLabel}
          variant='subtitle1'>
          {data}
        </Typography>}
    />
  );
}

function TextInput({ data, action }){
  const dispatch = useDispatch();
  return (
  <>
    <TextField
      className={styles.allInputs}
      size="small"
      defaultValue={data}
      onChange={(e) => dispatch(action(e.target.value))}
    />
  </>
  );
}

function PasswordInput({ action }){
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();
  return (
    <OutlinedInput
      className={styles.allInputs}
      size="small"
      type={showPassword ? 'text' : 'password'}
      placeholder="••••••••"
      onChange={(e) => dispatch(action(e.target.value))}
      endAdornment={
        <IconButton
          onClick={() => setShowPassword(!showPassword)}
          edge="end"
        >
          {showPassword ? <VisibilityOff/> : <Visibility/>}
        </IconButton>}
    />
  );
}

function DatePicker({ data, action }){
  const hireDate = useSelector((state) => state.editUserData.updatedData.hireDate);
  const dispatch = useDispatch();
  return (
    <input
      className={`${styles.datePicker} ${styles.allInputs}`}
      type="date"
      value={hireDate !== undefined ? hireDate : data}
      min="2016-01-01"
      onChange={(e) => {dispatch(action(e.target.value))}}
    />
  );
}

function DropdownList({ data, action, objectName }){
  const [ dropdownData, setDropdownData] = React.useState(null);
  const [ dropdownValue, setDropdownValue ] = React.useState(null);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchData = async () => {
      const headers = {method: 'GET'}
      const endpoint = `/api/choices/${objectName}`
      const result = await fetch(endpoint, headers);
      const { data } = await result.json();
      setDropdownData(data);
    }
    fetchData()
  },[,objectName]);

  function getValueForSelect(){
    for(let i = 0; i < dropdownData.length; i++){
      if(dropdownData[i][objectName] === data){
        const localKeys = Object.keys(dropdownData[i])
        return dropdownData[i][localKeys[0]];
      }
    }
  }

  if(dropdownData === null || dropdownData === undefined)
    return (
      <Select
        value={1}
        className={styles.allInputs}
        size="small">
        <MenuItem value={1}>
          {data}
        </MenuItem>
      </Select>
    )

  return (
    <Select
      value={dropdownValue || getValueForSelect()}
      className={styles.allInputs}
      onChange={(e) => {
        setDropdownValue(e.target.value)
        dispatch(action(e.target.value))
        }
      }
      size="small">
      {
        dropdownData.map((object, key) => {
            const keys = Object.keys(object);
            return (
              <MenuItem
                key={key}
                value={object[keys[0]]}>
                {object[keys[1]]}
              </MenuItem>
            );
        })
      }
    </Select>
  );
}
