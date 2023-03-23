/* Importing the necessary components from the Material UI library. */
import React, { useState } from 'react';
import { Box } from '@mui/system';
import { IndexDrawer } from "./Drawer/IndexDrawer";
import Head from 'next/head';
import { SelectedModule } from './Context';

export default function Layout( props ) {
  const [selectedModule, setSelectedModule] = useState('');
  // is loading is ready to be used  for displaying a loader
  const [ isLoading, setIsLoading ] = React.useState(true);
  const [currentUser, setCurrentUser] = useState({});

  const fetchData = async () => {
    setIsLoading(true);
    const endpoint = '/api/auth/user'
    const request = await fetch(endpoint, { method: 'GET', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }});
    const data = await request.json();
    setCurrentUser(data.data);
    setIsLoading(false);
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
        <SelectedModule.Provider value={[selectedModule, setSelectedModule]}>
          <IndexDrawer user={ currentUser }/>
        </SelectedModule.Provider>
        {props.children}
        <h1>{selectedModule}</h1>
      </Box>
    </>
  )
}
