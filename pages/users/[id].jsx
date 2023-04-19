import React from "react";
import Layout from "./../../components/Index/Layout"
import { useRouter } from "next/router";
import '@fontsource/roboto/400.css';
import { useSelector, useDispatch } from "react-redux";
import { restoreAll } from './../../store/editUserSlice'
import RefreshUnauthorized from "/components/generic/RefreshUnauthorized/RefreshUnauthorized";
import RightPanel from "../../components/Modules/Users/Id/RightPanel/RightPanel";
import { setUserData, setIsDataUpdated } from "/store/editUserSlice";

export default function UsersById({ serverData }){
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.editUserData.userData)
  const isDataUpdated = useSelector((state) => state.editUserData.isDataUpdated);
  const router = useRouter();
  dispatch(setUserData(serverData));
  isDataUpdated ? dispatch(setIsDataUpdated(false)) : null;
  React.useEffect(()=>{
    async function restoreAllUpdate (){
      dispatch(restoreAll())
    }
    return () => { restoreAllUpdate() }
  },[dispatch])

  return (
    <Layout>
      <RefreshUnauthorized status={userData?.status} router={router}/>
      <RightPanel/>
    </Layout>
  )
}

/******************************************************** Server Side *********************************************************/
/* These lines of code are importing necessary modules and controllers for server-side rendering of the
UsersById page. */
const { UserController } = require('/controllers/userController');
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../lib/ironOptions";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps( context ){

    if(Number.isInteger(parseInt(context.query.id))){
      const userController = new UserController();
      const req = {
        query: {id: context.query.id},
        method: 'GET',
        cookies: context.req.cookies
      }
      const result = await userController.usersId(req);
      return { props: { serverData: result.data } }
    }

    else{
      return {
        redirect: {
          permanent: false,
          destination: '/users'
        }
      }
    }
  },
  ironOptions
);

