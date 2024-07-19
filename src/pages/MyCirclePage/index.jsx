import React from 'react';
import { Grid } from '@mui/material';
export default function MyCirclePage() {

  return (
    <Grid container
      p={3}
      marginLeft={{ xs: '10px', sm: '5%' }}
      marginRight={{ xs: '10px', sm: '5%' }}
      width={{ xs: 'calc(100% - 20px)', sm: '90%' }}
      direction='row'
      columnSpacing={3}
      alignItems='flex-start'
      justifyContent='center'
      textAlign={'center'}
    >
      <Grid item xs={0} sm={0} md={2} display={{ xs: 'none', md: 'block' }}> left </Grid>
      <Grid item xs={12} sm={12} md={6.5}>
        <h1>My Circle Page</h1>
      </Grid>
      <Grid item xs={0} sm={0} md={3.5} display={{ xs: 'none', md: 'block' }}> right </Grid>
    </Grid>
  );
};