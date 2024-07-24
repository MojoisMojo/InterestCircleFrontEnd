// 展示圈子信息的卡片组件，包括圈子icon、圈子名、简介、人数、帖子数
// 通过 props 传入用户信息，包括 ciconurl, cname、cdesc, cusernumber、cpostnumber

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import { blue } from '@mui/material/colors';
import { Grid } from '@mui/material';

function CircleInfoCard({ cicon, cdesc, cname, cusernumber, cpostnumber }) {
  return (
    <Card
      width='100%'
      elevation={3}
      sx={{ borderRadius: '8px', }}
    >
      <CardHeader
        avatar={
          <Avatar src={cicon}>
          </Avatar>
        }
        title={cname}
        titleTypographyProps={{ align: 'center', variant: 'h6', fontWeight: 'bold' }}
        subheader={cdesc}
      />

      <Grid container spacing={2} sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        paddingBottom: 2,
      }}>
        <Grid item
          xs={6}
          style={{
            flexDirection: 'column',
          }}>
          <Typography variant="h6" color='text.primary' align="center" sx={{ fontWeight: 'bold' }}>
            {cusernumber}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            圈内人数
          </Typography>
        </Grid>
        <Grid item
          xs={6}
          style={{
            flexDirection: 'column',
          }}>
          <Typography variant="h6" color="text.primary" align="center" sx={{ fontWeight: 'bold' }}>
            {cpostnumber}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            贴子数
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default CircleInfoCard;