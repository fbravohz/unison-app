import Head from 'next/head';
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "./../lib/ironOptions";
import {ListItemButton,ListItemIcon,ListItemText,ListItem,Avatar,Divider,Stack,List,Toolbar,Drawer }from '@mui/material';
import LabelIcon from '@mui/icons-material/Label';
import LogoutIcon from '@mui/icons-material/Logout';

function PermanentDrawerLeft(props) {
  const drawerWidth = 300;
  return (

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            // background: '#73777d',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
            <Avatar alt="user">T</Avatar>
            {props.children}
          </Stack>
        </Toolbar>
        <Divider />
        <List>
          {['item 1', 'item2', 'item 3', 'item 4', 'item 5', 'item 6', 'item 7'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LabelIcon/>
                </ListItemIcon>
                <ListItemText  primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
            <ListItem key={1} disablePadding>
              <ListItemButton onClick={logoutHandler}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={'Logout'} />
              </ListItemButton>
            </ListItem>
          {/* {props.myButton} */}
        </List>
      </Drawer>
  );
}






export default function Home({ user }) {
  return (
    <div>
        <Head>
          <title>Growhill</title>
        </Head>
      <PermanentDrawerLeft>
        <h4>{ user?.email }</h4>
      </PermanentDrawerLeft>
    </div>
  )
}


const logoutHandler = async (event) => {
  event.preventDefault()
  const req = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: ''
  }
  const res = await fetch('/api/auth/logout', req)
  if (res) window.location.reload();
}


export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps( { req } ) {
    if (req.session.user === undefined){
      return { props: { } }
      }
    return { props: { user: req.session?.user } }
  },
  ironOptions
);