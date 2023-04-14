import React from "react";
import Layout from "./../../components/Index/Layout"
import { useRouter } from "next/router";
import '@fontsource/roboto/400.css';
import { useSelector, useDispatch } from "react-redux";
import { restoreAll } from './../../store/editUserSlice'
import Loading from "../../components/generic/Loading/Loading";
import RefreshUnauthorized from "/components/generic/RefreshUnauthorized/RefreshUnauthorized";
import RightPanel from "../../components/Modules/Users/Id/RightPanel/RightPanel";
import { setUserData, setIsDataUpdated } from "/store/editUserSlice";
import { setIsCreateUser } from "../../store/editUserSlice";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../lib/ironOptions";

export default function UsersById({ serverData }){
  const [ isLoading, setIsLoading ] = React.useState(false);
  const userData = useSelector((state) => state.editUserData.userData)
  const isDataUpdated = useSelector((state) => state.editUserData.isDataUpdated);
  const dispatch = useDispatch();
  const router = useRouter();
  if(router.query.id === 'createUser')
    dispatch(setIsCreateUser(true));
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
      {isLoading ? <Loading/> : <RightPanel/>}
    </Layout>
  )
}

/******************************************************** Server Side *********************************************************/

/* Importing the UserController class from the controllers/userController.js file. */
const { UserController } = require('/controllers/userController');
/* This line of code is importing the `ColumnsController` class from the `columnsController.js`*/
const { ColumnsController } = require('/controllers/columnsController');

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
      console.log(result);
      return { props: { serverData: result.data } }
    }

    if(!Number.isInteger(parseInt(context.query.id)) && String(context.query.id) === 'createUser'){
      const columnsController = new ColumnsController();
      const req = {
        query: {tableName: 'user'},
        method: 'GET',
        cookies: context.req.cookies
      }
      const result = await columnsController.getTableColumns(req);
      console.log(result);
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

