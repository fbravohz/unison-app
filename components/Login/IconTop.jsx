import React from "react";
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';

const iconStyle ={
  margin: 'auto',
  color: '#547b0f',
  '&:hover':{color:'#6da41d'}
}

function IconTop(){
  return (
      <LockPersonOutlinedIcon
        sx={iconStyle}
        fontSize='large'
      />
  )
}

module.exports = { IconTop };