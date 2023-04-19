import React from "react";
import styles from "./CreateUser.module.css"
import UserCard from '../Id/RightPanel/UserCard/UserCard'
import { useDispatch, useSelector } from "react-redux";
import { setUserData, setIsCreateUser } from "../../../../store/editUserSlice";
import Loading from '/components/generic/Loading/Loading'
import '@fontsource/roboto/400.css';

export default function CreateUser(){
  const dispatch = useDispatch();
  const userData = useSelector(state => state.editUserData.userData);

  React.useEffect(() => {
    async function fetchData(){
      const endpoint = '/api/columns/user'
      const req = {
        method: 'GET',
      }
      const res = await fetch(endpoint, req);
      const { data } = await res.json();
      data && dispatch(setUserData(data));
    }
    dispatch(setIsCreateUser(true));
    fetchData();
  },[,dispatch])

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          {userData !== undefined ? <UserCard/> : <Loading/> }
        </div>
      </div>
    </>
  );
}
