// 展示用户信息的卡片组件，包括头像、用户名、圈子数、获赞数
// 通过 props 传入用户信息，包括 id、name、avatar、circleCount、likeCount

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import { blue } from '@mui/material/colors';
import { Grid } from '@mui/material';

function UserInfoCard({ id, name, avatar, circleCount, likeCount }) {
  return (
    <Card
      width='100%'
      elevation={3}
      sx={{ borderRadius: '8px', }}
    >
      <CardHeader
        avatar={
          <Avatar src={avatar} aria-label="user-avatar">
            {name[0]}
          </Avatar>
        }
        title={name}
        titleTypographyProps={{ align: 'center', variant: 'h6', fontWeight: 'bold' }}
      />

      <Grid container spacing={2} sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <Grid item
          xs={6}
          style={{
            flexDirection: 'column',
          }}>
          <Typography variant="h6" color='text.primary' align="center" sx={{ fontWeight: 'bold' }}>
            {circleCount}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            圈子数
          </Typography>
        </Grid>
        <Grid item
          xs={6}
          style={{
            flexDirection: 'column',
          }}>
          <Typography variant="h6" color="text.primary" align="center" sx={{ fontWeight: 'bold' }}>
            {likeCount}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            获赞数
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default UserInfoCard;