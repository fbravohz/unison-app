import React from 'react';
import Image from 'next/image'
import logoGrowHill from '/public/logoGrowhillb.png'
import { Grid } from '@mui/material'

const imageStyle = {
  margin: 'auto'
}

function LogoGrowHill(){
  return (
    <Grid item>
      <Image
        src={logoGrowHill}
        alt='growhill-logo'
        height={190}
        width={230}
        sx={imageStyle}
        priority={true}
      />
    </Grid>
  )
}

module.exports = { LogoGrowHill };