import React from "react";
import BackButton from "./BackButton/BackButton";
import styles from "./RightPanel.module.css"
import UserCard from "./UserCard/UserCard";
/**
 * It returns a div with a back button and a tooltip,
 * a card with the user's data, a divider, and
 * buttons for editing and deleting the user
 * @returns A div with a back button and a user card.
 */
export default function RightPanel(){
  return(
    <div className={styles.rightPanel}>
      <BackButton/>
      <UserCard/>
  </div>
  )
}


