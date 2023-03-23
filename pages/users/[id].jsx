import React from "react";
import Layout from "./../../components/Index/Layout"
import { Typography , Card, IconButton, Tooltip, Divider, CircularProgress, Fab } from '@mui/material';
import { Avatar, Chip } from "@mui/material";
import { useRouter } from "next/router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



export default function UsersById(){
  const [ userData, setUserData ] = React.useState({});
  const [ isLoading, setIsLoading ] = React.useState(true);
  const router = useRouter();

  async function fetchData(id){
    setIsLoading(true);
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
  }, [router.query])

  return (
    <Layout>
      { (userData?.status !== undefined && userData?.status === 401 ) ? router.push('/') : null}
      { isLoading ?
        (
          <div style={{height: '100vh', width: '100vw', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridTemplateRows: 'repeat(5, 1fr)'}}>
            <CircularProgress style={{ color: '#547b0f', gridColumnStart: 3, gridRowStart: 3}}/>
          </div>
        ) :
        (
          <div style={{ height: '97vh',width: '95vw', display: 'grid', gridTemplateColumns: '1fr 6fr 1fr', gridTemplateRows: '1fr 3.5fr 1fr', gridGap: '5px' }}>
            <div style={{gridRowStart: 1, gridRowEnd: 1, gridColumnStart: 1, gridColumnEnd: 1, margin: '10px' }}>
              <Tooltip title={"Atrás"} onClick={() => { router.push('/users')}}>
                <IconButton>
                  <ArrowBackIcon style={{ color: '#547b0f'}}/>
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
                  <Avatar variant="circular" sx={{ height: '90px', width: '90px', backgroundColor: '#819958'}} alt={`User=${router.query.id}`} src="/static/images/avatar/1.png"/>
                  <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '15px'}}>
                    <Typography variant="h6" style={{color: '#5e5e5e'}}>{userData.fullname}</Typography>
                    <Typography variant="subtitle1" style={{color: '#7e7e7e'}}>Programador</Typography>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-end', gridRowStart: 1, gridColumnStart: 3, marginBottom: '20px'}}>
                  <Fab size="small" color="default" aria-label="edit" variant='extended' style={{ margin: '10px', marginLeft: '150px', boxShadow: 'none'}}>
                    <EditIcon/>Editar
                  </Fab>
                  <Fab size="small" color="error" aria-label="delete"  variant='extended' style={{ margin: '10px', marginLeft: '150px', boxShadow: 'none'}}>
                    <DeleteIcon/>Eliminar
                  </Fab>
                </div>
                <Divider style={{gridRowStart: 1, gridColumnStart: 1, gridColumnEnd: 4, color: '#547b0f', borderBottomWidth: '0.5px' , borderColor: '#547b0f'}}/>
                <UserDataField fieldName={'Nombre'} fieldUserData={userData.fullname} />
                <UserDataField fieldName={'Posición'} fieldUserData={'Programador'} />
                <UserDataField fieldName={'Antigüedad'} fieldUserData={userData.hireDate} />
                <UserDataField fieldName={'Usuario'} fieldUserData={userData.username} />
                <UserDataField fieldName={'Contraseña'} fieldUserData={'********'} />
                <UserDataField fieldName={'Compañia'} fieldUserData={'Eiken Agro'} />
                <UserDataField fieldName={'ID de usuario'} fieldUserData={userData.id_user} />
                <UserDataField fieldName={'Perfil de usuario'} fieldUserData={'Administrador'} />
                <UserDataField fieldName={'Estado de usuario'} fieldUserData={'Activo'} />
              </div>
            </Card>
          </div>
        )
      }
    </Layout>
  )
}

function UserDataField( { fieldName, fieldUserData } ){
  return(
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', marginLeft: '25px'}}>
      <Typography variant='subtitle1' style={{ marginTop: '30px', color: '#7e7e7e'}}>{fieldName}</Typography>
      <Chip label={<Typography variant='subtitle1' style={{ color: '#ffffff' }}>{fieldUserData}</Typography>} style={{ marginTop: '20px', backgroundColor: '#547b0f', minWidth: '100px'}}></Chip>
    </div>
  );
}