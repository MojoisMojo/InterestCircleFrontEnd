// 展示用户信息的卡片组件，包括头像、用户名、圈子数、发帖数
// 通过 props 传入用户信息，包括 id、name、avatar、circleCount、likeCount

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import { blue } from '@mui/material/colors';
import { Grid } from '@mui/material';

function UserInfoCard({ name, bio, avatar, circlesCount, postsCount }) {
  return (
    <Card
      elevation={3}
      sx={{ width: '100%', borderRadius: '8px', }}
    >
      <CardHeader
        sx={{
          padding: { xs: 2, lg: 3 },
          alignItems: 'center',
          justifyContent: 'flex-start',
          '& .MuiCardHeader-content': {
            maxWidth: 'calc(90% - 60px)',
          },
          '& .MuiCardHeader-title': {
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%',
            wordBreak: 'break-all',
          },
          '& .MuiCardHeader-subheader': {
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%',
            wordBreak: 'break-all',
          },
          '& .MuiCardHeader-avatar': {
            marginRight: '8px !important',
            marginLeft: {
              xs: '10% !important',
              sm: '0 !important',
              md: '16px !important'
            },
          }
        }}
        avatar={
          <Avatar
            sx={{
              width: { xs: 45, md: 50, lg: 60 },
              height: { xs: 45, md: 50, lg: 60 },
            }}
            src={avatar}
          />
        }
        title={name}
        titleTypographyProps={{
          align: 'center', variant: 'h6', fontWeight: 'bold'
        }}
        subheader={bio}
        subheaderTypographyProps={{
          align: 'center', variant: 'body2',
          color: 'text.secondary',
        }}
      />
      <Grid container
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          paddingBottom: 2,
        }}
      >
        <Grid item
          xs={6}
          style={{
            flexDirection: 'column',
          }}>
          <Typography
            variant="h6" color='text.primary'
            align="center" sx={{ fontWeight: 'bold' }}
          >
            {circlesCount}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
          >
            圈子数
          </Typography>
        </Grid>
        <Grid item
          xs={6}
          style={{
            flexDirection: 'column',
          }}>
          <Typography variant="h6" color="text.primary" align="center" sx={{ fontWeight: 'bold' }}>
            {postsCount}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            发帖数
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default UserInfoCard;