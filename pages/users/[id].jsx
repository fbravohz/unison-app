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

/**
 * It fetches data from the server and sets the userData state.
 * @returns The user data is being returned.
 */
async function fetchData(id, dispatch, setIsLoading){
  if(id === undefined)
    return
  const req = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
  setIsLoading(true);
  const endpoint = `/api/users/${id}`;
  const res = await fetch(endpoint, req);
  const data = await res.json();
  setIsLoading(false);
  if(data.object !== undefined && data.status === 401)
    dispatch(setUserData(data));
  else
    dispatch(setUserData(data.data));
}

export default function UsersById(){

  const [ isLoading, setIsLoading ] = React.useState(true);
  const userData = useSelector((state) => state.editUserData.userData)
  const isDataUpdated = useSelector((state) => state.editUserData.isDataUpdated);
  const dispatch = useDispatch();
  const router = useRouter();

  React.useEffect(() => {
    fetchData(router.query.id, dispatch, setIsLoading);
    isDataUpdated ? dispatch(setIsDataUpdated(false)) : null;
  },[router.query.id, dispatch, isDataUpdated])

  React.useEffect(()=>{
    async function restoreAllUpdate (){
      dispatch(restoreAll())
    }
    return () => { restoreAllUpdate() }
  },[dispatch])

  return (
    <Layout>
      <RefreshUnauthorized status={userData?.status} router={router}/>
      { isLoading ? <Loading/> : <RightPanel/>}
    </Layout>
  )
}
