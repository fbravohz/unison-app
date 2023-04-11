import React from "react";
import { CircularProgress } from "@mui/material";
import styles from "./Loading.module.css"

  /**
   * It returns a div with a circular progress bar
   * @returns A circular progress bar.
   */
export default function Loading(){
    return(
      <div className={styles.usersByIdProgressContainer}>
        <CircularProgress className={styles.circularProgress}/>
      </div>
    )
  }