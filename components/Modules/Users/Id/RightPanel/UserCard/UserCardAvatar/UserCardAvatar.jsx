import React from "react";
import { Avatar, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import styles from './UserCardAvatar.module.css'

/**
 * Component that displays the user's avatar.
 * @returns {JSX.Element} JSX element that contains the user's avatar.
 */
function UserAvatar(){
  const router = useRouter()

  return(
    <Avatar
      className={styles.usersByIdAvatar}
      alt={`User=${router.query.id}`}
      src="/static/images/avatar/1.png"
      variant="circular"
    />
  )
}

/**
 * Component that displays the user's full name.
 * @param {object} props - Component properties.
 * @param {string} props.fullname - The user's full name.
 * @returns {JSX.Element} JSX element that contains the user's full name.
 */
function UserFullname({fullname}){
  return (
    <Typography variant="h6">
      {fullname}
    </Typography>
  )
}

/**
 * Component that displays the user's position.
 * @param {object} props - Component properties.
 * @param {string} props.position - The user's position.
 * @returns {JSX.Element} JSX element that contains the user's position.
 */
function UserPosition({position}){
  return(
    <Typography
      className={styles.subtitle1}
      variant="subtitle1"
    >
      {position}
    </Typography>
  )
}

/**
 * Component that displays the user's avatar, full name, and position.
 * @returns {JSX.Element} JSX element that contains the user's avatar,
 * full name, and position.
 */
export default function UserCardAvatar(){
  const userData = useSelector((state) => state.editUserData.userData);

  return(
    <div className={styles.userCardAvatarContainer}>
      <UserAvatar/>
      <div className={styles.usersByIdContainerTypography}>
        <UserFullname fullname={userData?.fullname}/>
        <UserPosition position={userData?.position}/>
      </div>
    </div>
  )
}
