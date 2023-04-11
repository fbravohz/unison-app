import React from 'react';
import { Typography, Chip } from '@mui/material';
import GetEditFieldByType from './GetEditFieldByType/GetEditFieldByType';
import { useSelector } from 'react-redux';
import styles from './UserDataFields.module.css'

/**
 * A map of column names to display labels for user data fields.
 * @type {Object.<string, string>}
 */
const columnToLabel = {
  id_user: 'ID',
  fullname: 'Nombre completo',
  username: 'Usuario',
  password: 'Contraseña',
  hireDate: 'Contratación',
  company: 'Compañia',
  country: 'País',
  position: 'Posición',
  userProfile: 'Perfil de usuario',
  userState: 'Estado'
}

/**
 * Renders a read-only user data field with a label and value chip.
 * @param {Object} props - The component props.
 * @param {string} props.fieldName - The name of the user data field.
 * @param {string} props.fieldUserData - The value of the user data field.
 * @returns {JSX.Element} - The component JSX element.
 */
function StaticUserDataField({ fieldName, fieldUserData }) {
  return (
    <div className={styles.UserDataFieldContainer}>
      <Typography
        className={styles.UserDataFieldTypography}
        variant='subtitle1'
      >
        {fieldName}
      </Typography>
      <Chip
        className={styles.UserDataFieldChip}
        label={
          <Typography
            className={styles.UserDataFieldChipLabel}
            variant='subtitle1'
          >
            {fieldUserData}
          </Typography>
        }
      />
    </div>
  );
}

/**
 * Renders an editable user data field with a label and input component.
 * @param {Object} props - The component props.
 * @param {string} props.fieldName - The name of the user data field.
 * @param {string} props.fieldUserData - The value of the user data field.
 * @param {string} props.fieldObjectName - The name of the corresponding
 * object in the state slice.
 * @returns {JSX.Element} - The component JSX element.
 */
function EditUserDataField({ fieldName, fieldUserData, fieldObjectName }) {
  return (
    <div className={styles.EditUserDataFieldContainer}>
      <Typography
        className={styles.EditUserDataFieldTypography}
        variant='subtitle1'>
        {fieldName}
      </Typography>
      <GetEditFieldByType
        fieldName={fieldName}
        fieldUserData={fieldUserData}
        fieldObjectName={fieldObjectName}
      />
    </div>
  )
}

/**
 * Renders all the read-only user data fields.
 * @returns {JSX.Element} - The component JSX element.
 */
function StaticUserDataFields() {
  const userData = useSelector((state) => state.editUserData.userData);
  return (
    <>
      {!userData ? null : Object.keys(userData).map((value, key) => (
        <StaticUserDataField
          key={key}
          fieldName={columnToLabel[value]}
          fieldUserData={userData[value]}
        />
      ))}
    </>
  )
}

/**
 * EditUserDataFields - Renders editable version of user data fields
 * @returns {JSX.Element} - Rendered component
 */
function EditUserDataFields(){
  const userData = useSelector((state) => state.editUserData.userData);

  return (
    Object.keys(userData).map((value, key) => (
      <EditUserDataField
        key={key}
        fieldName={columnToLabel[value]}
        fieldUserData={userData[value]}
        fieldObjectName={value}
      />
    ))
  );
}

/**
 * UserDataFields - Renders either the editable or static user data fields
 * @returns {JSX.Element} - Rendered component
 */
export default function UserDataFields(){
  const isEditData = useSelector((state) => state.editUserData.isEditData);

  return (
    <>
      {!isEditData ? <StaticUserDataFields/> : <EditUserDataFields/> }
    </>
  );
}
