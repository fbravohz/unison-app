import React from "react";
import UsersTable from "./UsersTable";

export default function UsersList(){
  const [ usersData, setUsersData] = React.useState({});
  const [ isLoading, setIsLoading ] = React.useState(true);

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
    <UsersTable usersData={usersData}/>
  </>
  );
}