// 展示圈子信息的卡片组件，包括圈子icon、圈子名、简介、人数、帖子数
// 通过 props 传入用户信息，包括 ciconurl, cname、cdesc, cusernumber、cpostnumber

import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import CardActionArea from '@mui/material/CardActionArea';
import { Grid } from '@mui/material';

function CircleInfoCard({ cicon, cdesc, cname, cusernumber, cpostnumber, handleJoinOrLeaveCircle, isJoined }) {

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
          '& .MuiCardHeader-subhead': {
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
            marginLeft: { xs: '10% !important', sm: '8px !important', md: '8px !important', lg: '0px !important' },
          }
        }}
        avatar={
          <Avatar
            sx={{
              width: { xs: 45, md: 50, lg: 60 },
              height: { xs: 45, md: 50, lg: 60 },
            }}
            src={cicon}
          />
        }
        title={cname}
        titleTypographyProps={{
          align: 'center', variant: 'h6', fontWeight: 'bold'
        }}
        subheader={cdesc}
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
      <CardActionArea
        sx={{
          display: (handleJoinOrLeaveCircle && isJoined != null) ? 'flex' : 'none',
          justifyContent: 'center',
          alignItems: 'center',
          height: 60,
          borderRadius: '5px',
        }}
        onClick={handleJoinOrLeaveCircle}
      >
        <Typography size="small" color="primary" >
          {isJoined ? "退出圈子" : "加入圈子"}
        </Typography>
      </CardActionArea>
    </Card>
  );
}

export default CircleInfoCard;