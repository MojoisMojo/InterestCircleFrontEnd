import { Padding } from '@mui/icons-material';
import { ButtonBase, Paper, Typography } from '@mui/material';
import React from 'react';

export default function AdivertiseCard({ advertise: oldAdvertise }) {
  let newAdvertise = {
    title: '广告位出租',
    content: (
      <p className="text-lg text-center text-yellow-200 hover:text-yellow-400">
        Connect Us
      </p>
    ),
    color: '#283593',
    textColor: '#E8EAF6',
    imgUrl: '',
    href: '/aboutus',
    ...oldAdvertise,
  }
  return (
    <Paper
      elevation={3}
      sx=
      {{
        width: '100%',
        backgroundImage: newAdvertise.imgUrl ? `url(${newAdvertise.imgUrl})` : 'none',
        backgroundColor: newAdvertise.color,
        height: 150, display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        borderRadius: '8px',
      }}
    >
      <ButtonBase sx={{
        width: '100%', height: '100%', display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',

      }}
        href={newAdvertise.href}
      >
        <Typography
          variant='h5' style={{
            color: newAdvertise.textColor,
            margin: '10px',
          }}
        >
          {newAdvertise.title}
        </Typography>
        <Typography variant='body2' style={{ color: newAdvertise.textColor }}>
          {newAdvertise.content}
        </Typography>
      </ButtonBase>
    </Paper>
  );
}