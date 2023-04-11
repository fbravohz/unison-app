import React from "react"
import styles from "./BackButton.module.css"
import { Tooltip, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
/**
 * It returns a div with a back button and a tooltip
 * @returns A div with a tooltip and an icon button.
 */
export default function BackButton(){
  const router = useRouter();
  return(
    <div className={styles.backButton}>
    <Tooltip
      title={"Atrás"}
      onClick={() => { router.push('/users')}}>
      <IconButton>
        <ArrowBackIcon className={styles.backButtonIcon}/>
      </IconButton>
    </Tooltip>
  </div>
  )
}