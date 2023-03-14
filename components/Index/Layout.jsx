/* Importing the necessary components from the Material UI library. */
import React, { useState } from 'react';
import { Box } from '@mui/system';
import { IndexDrawer } from "./Drawer/IndexDrawer";
import Head from 'next/head';
import { SelectedModule } from './Context';

export default function Layout( props ) {
  const [selectedModule, setSelectedModule] = useState('');
  return (
    <>
      <Head>
        <title>Growhill</title>
      </Head>
      <Box sx={{ display: 'flex'}}>
        <SelectedModule.Provider value={[selectedModule, setSelectedModule]}>
          <IndexDrawer user={ props.user }/>
        </SelectedModule.Provider>
        {props.children}
        <h1>{selectedModule}</h1>
      </Box>
    </>
  )
}
