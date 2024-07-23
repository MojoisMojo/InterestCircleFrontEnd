import { Padding } from '@mui/icons-material';
import { ButtonBase, Paper, Typography } from '@mui/material';
import React from 'react';

export default function AdivertiseCard({ advertise }) {
  if (!advertise) {
    advertise = {
      title: '广告位出租',
      content: '广告位出租',
      color: '#283593',
      textColor: '#E8EAF6',
      imgUrl: '',
    }
  }
  return (
    <Paper
      elevation={3}
      
      sx=
      {{
        backgroundImage: advertise.imgUrl ? `url(${advertise.imgUrl})` : 'none',
        backgroundColor: advertise.color,
        height: 150, display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        borderRadius: '8px',
      }}
    >
      <ButtonBase sx={{
        width: '100%', height: '100%', display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <Typography
          variant='h5' style={{ 
            color: advertise.textColor,
            margin: '10px',
          }}
        >
          {advertise.title}
        </Typography>
        <Typography variant='body2' style={{ color: advertise.textColor }}>
          {advertise.content}
        </Typography>
      </ButtonBase>
    </Paper>
  );
}