/* Importing the necessary components from the Material UI library. */
import React, { useState } from 'react';
import { Box } from '@mui/system';
import { IndexDrawer } from "./Drawer/IndexDrawer";
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedModule, setSelectedSubModule } from '/store/selectModuleSlice';
import { useRouter } from 'next/router';

export default function Layout( props ) {
  const selectedSubModule = useSelector(state => state.selectModule.selectedSubModule);
  const selectedModule = useSelector(state => state.selectModule.selectedModule);
  const dispatch = useDispatch();
  const router = useRouter();

  function checkRouteUpdateDrawerSelection(){
    if(router.pathname === '/users'){
      selectedModule !== 'Usuarios' && dispatch(setSelectedModule('Usuarios'))
      selectedSubModule !== 'Listado' && dispatch(setSelectedSubModule('Listado'))
    } // place here the logic for all modules and sub modules
  }

  checkRouteUpdateDrawerSelection();

  const [currentUser, setCurrentUser] = useState({});

  const fetchData = async () => {
    const endpoint = '/api/auth/user';
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };
    const request = await fetch(endpoint, req);
    const data = await request.json();
    setCurrentUser(data.data);
  }

  React.useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <Head>
        <title>Growhill</title>
      </Head>
      <Box sx={{ display: 'flex'}}>
        <IndexDrawer user={ currentUser }/>
        {props.children}
      </Box>
    </>
  )
}
