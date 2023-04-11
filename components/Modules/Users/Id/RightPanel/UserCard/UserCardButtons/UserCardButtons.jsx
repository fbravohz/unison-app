import React from "react";
import { Fab } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import styles from './UserCardButtons.module.css'
import { useSelector, useDispatch } from "react-redux";
import { setIsDataUpdated, setIsEditData, restoreChanges } from '/store/editUserSlice.js'
import { useRouter } from "next/router";

/**
 * Displays a button for saving changes to user data.
 * @return {JSX.Element} The SaveButton component.
 */
function FabButton({color, text, icon, onClick}) {
  return (
    <Fab
      className={styles.fabButton}
      size="small"
      color={color}
      aria-label="edit"
      variant='extended'
      onClick={onClick}
    >
      {icon}
      {text}
    </Fab>
  )
}

/**
 * Displays the buttons for editing, saving, and deleting data.
 * @return {JSX.Element} The UserCardButtons component.
 */
export default function UserCardButtons() {
  const isEditData = useSelector((state) => state.editUserData.isEditData);
  const updatedData = useSelector((state) => state.editUserData.updatedData);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className={styles.usersByIdContainerButtons}>
      {!isEditData ?
        <FabButton
          color="primary"
          text="Editar"
          icon={<EditIcon/>}
          onClick={() => dispatch(setIsEditData(true))}
        /> :
        <FabButton
          color="primary"
          text="Guardar"
          icon={<SaveIcon/>}
          onClick={() => handleSave(updatedData, router, dispatch, setIsDataUpdated, setIsEditData)}
        />}
      {!isEditData ?
        <FabButton
          color="error"
          text="Eliminar"
          icon={<DeleteIcon/>}
        /> :
        <FabButton
          color="error"
          text="Cancelar"
          icon={<CancelIcon/>}
          onClick={() => {
            dispatch(setIsEditData(false));
            dispatch(restoreChanges());
          }}
        />}
    </div>
  )
}

async function handleSave(updatedData, router, dispatch, setIsDataUpdated, setIsEditData){
  const req = {
  method: 'PATCH',
  body: JSON.stringify(updatedData),
  headers: {
    'Content-Type': 'application/json'
  }
  }
  const endpoint = `/api/users/${router.query.id}`;
  const res = await fetch(endpoint, req);
  const json = await res.json();
  if(json.status === 200){
    dispatch(setIsDataUpdated(true));
    dispatch(setIsEditData(false));
  }
}