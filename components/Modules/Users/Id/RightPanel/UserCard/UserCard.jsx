import React from 'react';
import { Card, Divider } from '@mui/material';
import UserCardButtons from './UserCardButtons/UserCardButtons'
import UserCardAvatar from './UserCardAvatar/UserCardAvatar';
import UserDataFields from './UserDataFields/UserDataFields';
import styles from './UserCard.module.css'

/**
* It returns a card with the user's data, a divider, and buttons for editing and deleting the user
* @returns A card with the user's data.
*/
export default function UserCard(){
  return(
    <Card
      className={styles.UsersByIdCard}
      sx={{ overflow: 'scroll'}}
      variant="outlined"
    >
      <div className={styles.headerContainer}>
        <UserCardAvatar/>
        <UserCardButtons/>
        <Divider className={styles.divider}/>
        <UserDataFields/>
      </div>
    </Card>
  )
}








