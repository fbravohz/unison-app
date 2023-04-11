import React from "react";

  /**
   * If the user is unauthorized, refresh the page
   */
export default function RefreshUnauthorized({ status, router } ){
  return (
    <>
      { (status === 401 ) ? router.push('/') : null}
    </>
  )
}