import React from "react";
import Layout from "./../../components/Index/Layout"
import { Typography , Card, IconButton, Tooltip, Divider, CircularProgress, Fab, TextField, Select, MenuItem } from '@mui/material';
import { Avatar, Chip } from "@mui/material";
import { useRouter } from "next/router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import '@fontsource/roboto/400.css';

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

const fieldTypeByName = {
    'ID': 'static',
    'Nombre completo': 'textInput',
    'Usuario': 'textInput',
    'Contraseña': 'passwordInput',
    'Contratación': 'datePicker',
    'Compañia': 'list',
    'País': 'static',
    'Posición': 'list',
    'Perfil de usuario': 'list',
    'Estado': 'list'
  };


export default function UsersById(){
  const [ userData, setUserData ] = React.useState({});
  const [ isLoading, setIsLoading ] = React.useState(true);
  const [ isEditData, setIsEditData ] = React.useState(false);
  const router = useRouter();

  async function fetchData(id){
    setIsLoading(true);
    if(id === undefined)
      return
    const req = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'}};
    const endpoint = `/api/users/${id}`;
    const res = await fetch(endpoint, req);
    const data = await res.json();
    if(data.object !== undefined && data.status === 401)
      setUserData(data)
    else
      setUserData(data.data);
    setIsLoading(false);
  }

  React.useEffect(() => {
    fetchData(router.query.id);
  },[router.query.id])

  return (
    <Layout>
      { (userData?.status !== undefined && userData?.status === 401 ) ? router.push('/') : null}
      { isLoading ?
        (
          <div className="grid-container">
            <CircularProgress className="circular-progress"/>
          </div>
        ) :
        (
          <div className="grid-container-2">
            <div className="back-button">
              <Tooltip
                title={"Atrás"}
                onClick={() => { router.push('/users')}}
              >
                <IconButton>
                  <ArrowBackIcon className="back-button-icon"/>
                </IconButton>
              </Tooltip>
            </div>
            <Card
              variant="outlined"
              sx={{ overflow: 'scroll'}}
              style={{gridRowStart: 2, gridRowEnd: 3, gridColumnStart: 2, gridColumnEnd: 3, padding: '25px', paddingBottom: '35px', borderRadius: '35px', borderWidth: '0.5px', borderColor: '#547b0f'}}
            >
              <div style={{ height: '100%',  display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', gridRowStart: 1, gridColumnStart: 1 , gridColumnEnd: 3, marginBottom: '20px'}}>
                  <Avatar
                    variant="circular"
                    sx={{ height: '90px', width: '90px', backgroundColor: '#819958'}}
                    alt={`User=${router.query.id}`}
                    src="/static/images/avatar/1.png"
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '15px'}}>
                    <Typography
                      variant="h6"
                      style={{color: '#5e5e5e'}}
                    >
                      {userData.fullname}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      style={{color: '#7e7e7e'}}
                    >
                      Programador
                    </Typography>
                  </div>
                </div>
                { isEditData
                  ?
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-end', gridRowStart: 1, gridColumnStart: 3, marginBottom: '20px'}}>
                    <Fab
                      size="small"
                      color="primary"
                      aria-label="edit"
                      variant='extended'
                      style={{ margin: '10px', marginLeft: '150px', boxShadow: 'none'}}
                    >
                      <SaveIcon/>Guardar
                    </Fab>
                    <Fab
                      onClick={() => setIsEditData(false)}
                      size="small"
                      color="error"
                      aria-label="delete"
                      variant='extended'
                      style={{ margin: '10px', marginLeft: '150px', boxShadow: 'none'}}
                    >
                      <CancelIcon/>Cancelar
                    </Fab>
                  </div>
                  :
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-end', gridRowStart: 1, gridColumnStart: 3, marginBottom: '20px'}}>
                    <Fab
                      onClick={() => setIsEditData(true)}
                      size="small"
                      color="primary"
                      aria-label="edit"
                      variant='extended'
                      style={{ margin: '10px', marginLeft: '150px', boxShadow: 'none'}}
                    >
                      <EditIcon/>Editar
                    </Fab>
                    <Fab
                      size="small"
                      color="error"
                      aria-label="delete"
                      variant='extended'
                      style={{ margin: '10px', marginLeft: '150px', boxShadow: 'none'}}
                    >
                      <DeleteIcon/>Eliminar
                    </Fab>
                  </div>
                }
                <Divider style={{gridRowStart: 1, gridColumnStart: 1, gridColumnEnd: 4, color: '#547b0f', borderBottomWidth: '0.5px' , borderColor: '#547b0f'}}/>
                { !isEditData ?
                  Object.keys(userData).map((value, key)=>(<UserDataField key={key} fieldName={columnToLabel[value]} fieldUserData={userData[value]}/>)) 
                  :
                  Object.keys(userData).map((value, key)=>(<EditUserDataField key={key} fieldName={columnToLabel[value]} fieldUserData={userData[value]} fieldObjectName={value}/>))
                }
              </div>
            </Card>
          </div>
        )
      }
    </Layout>
  )
}



function UserDataField( { fieldName, fieldUserData} ){
  return(
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', marginLeft: '25px'}}>
      <Typography variant='subtitle1' style={{ marginTop: '30px', color: '#7e7e7e'}}>{fieldName}</Typography>
      <Chip label={<Typography variant='subtitle1' style={{ color: '#ffffff' }}>{fieldUserData}</Typography>} style={{ marginTop: '20px', backgroundColor: '#547b0f', minWidth: '190px'}}></Chip>
    </div>
  );
}




function EditUserDataField({ fieldName, fieldUserData, fieldObjectName }){
  return(
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', marginLeft: '25px'}}>
      <Typography variant='subtitle1' style={{ marginTop: '30px', color: '#7e7e7e'}}>{fieldName}</Typography>
      <GetEditFieldByType fieldName={fieldName} fieldUserData={fieldUserData} fieldObjectName={fieldObjectName}/>
    </div>
  )
}





function GetEditFieldByType( { fieldName, fieldUserData, fieldObjectName } ){

  const [ foreignKeysData, setForeignKeysData] = React.useState(null);

  const fetchData = async (fieldObjectName) => {
    const headers = {method: 'GET'}
    const endpoint = `/api/choices/${fieldObjectName}`
    const result = await fetch(endpoint, headers);
    const { data } = await result.json();
    setForeignKeysData(data);
  }

  React.useEffect(() => {
    (fieldTypeByName[fieldName] === 'list' && foreignKeysData === null)
    ? fetchData(fieldObjectName)
    : null
  }, [fieldName, foreignKeysData, fieldObjectName]);

  function getValueForSelect(){
    if(foreignKeysData !== null){
      for(let i = 0; i < foreignKeysData.length; i++){
        if(foreignKeysData[i][fieldObjectName] === fieldUserData){
          const localKeys = Object.keys(foreignKeysData[i])
          return foreignKeysData[i][localKeys[0]];
        }
      }
    }
    return null;
  }

  switch (fieldTypeByName[fieldName]){
    case 'static':
      return (
        <Typography
          variant='subtitle1'
          style={{
            color: '#111111',
            marginTop: '20px'
          }}
        >
          {fieldUserData}
        </Typography>
      );
    case 'textInput':
      return (
        <TextField
          style={{
            marginTop: '20px'
          }}
          size="small"
          defaultValue={fieldUserData}
        />
      );
    case 'passwordInput':
      return (
        <TextField
          style={{
            marginTop: '20px'
          }}
          size="small"
          type="password"
        />
      );
    case 'datePicker':
      return (
        <input
          style={{
            height: '37px',
            minWidth: '192px',
            marginTop: '20px',
            fontFamily: 'Roboto',
            border: 'solid #c3c3c3',
            borderWidth: '1px',
            borderRadius: '5px'
          }}
          type="date"
          id="start"
          name="trip-start"
          value={fieldUserData}
          min="2018-01-01"
        />
      );
    case 'list':
      return (
        <Select
          style={{
            marginTop: '20px',
            minWidth: '190px'
          }}
          size="small"
          value={getValueForSelect()}
        >
          {foreignKeysData !== null
            ? foreignKeysData.map((object, key) => {
                const keys = Object.keys(object);
                return (
                  <MenuItem
                    key={key}
                    value={object[keys[0]]}
                  >
                    {object[keys[1]]}
                  </MenuItem>
                );
              })
            : null}
        </Select>
      );
  }
}
