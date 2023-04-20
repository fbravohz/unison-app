import React from "react";
import UsersTable from "./UsersTable";
import CreateUser from "./createUser/CreateUser";
import { useDispatch, useSelector } from "react-redux";

import Loading from "/components/generic/Loading/Loading";
import styles from "./UsersComponent.module.css";

export default function UsersList(){
  const [ usersData, setUsersData] = React.useState({});
  const [ isLoading, setIsLoading ] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);

  const isModal = useSelector(state => state.editUserData.isModal)

  const fetchData = async () => {

    setIsLoading(true);

    const endpoint = '/api/users'
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }

    const request = await fetch(endpoint, req);
    const data = await request.json();
    setUsersData(data.data);
    setIsLoading(false);
  }

  React.useEffect(() => {
    fetchData();
  }, [])

  return(
  <>
    {isModal &&
    <CreateUser
      modalState={isOpen}
      setModalState={setIsOpen}
    />}
    {isLoading ?
      <div
        className={styles.loadingContainer}>
        <Loading/>
      </div> :
    <>
    <UsersTable
      usersData={usersData}
    />

    </>
    }
  </>
  );
}