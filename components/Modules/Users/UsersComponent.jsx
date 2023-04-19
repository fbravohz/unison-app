import React from "react";
import UsersTable from "./UsersTable";
import CreateUser from "./createUser/CreateUser";
import { useDispatch, useSelector } from "react-redux";
import { setIsModal } from "../../../store/editUserSlice";
import Loading from "/components/generic/Loading/Loading"

export default function UsersList(){
  const [ usersData, setUsersData] = React.useState({});
  const [ isLoading, setIsLoading ] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();
  const isModal = useSelector(state => state.editUserData.isModal)

  const openModal = () => {
    dispatch(setIsModal(true));
  }

  const fetchData = async () => {
    setIsLoading(true);
    const endpoint = '/api/users'
    const request = await fetch(endpoint, { method: 'GET', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }});
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
        style={{
          display: 'grid',
            justifyContent: 'center',
            position: 'fixed',
            width: '84%',
            height: '100%',
            left: '16%'}}>
        <Loading/>
      </div> :
    <UsersTable
      usersData={usersData}
      newUserButton={
        <button onClick={openModal}>
          Crear usuario
        </button>}
    />
    }
  </>
  );
}