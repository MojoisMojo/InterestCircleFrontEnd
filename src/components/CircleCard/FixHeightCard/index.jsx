import { useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function FixHeightCircleCard({ circle, cardWidth, onEnterCircle, onJoinOrLeaveCircle, isJoined }) {
  const imgHeight = 192;
  const textHeght = 120;

  async function handleJoinOrLeaveCircle(event) {
    onJoinOrLeaveCircle(circle.cid, isJoined);
  };

  async function handleEnterCircle(event) {
    console.log('enter', circle.cname);
    setTimeout(async () => {
      await onEnterCircle(circle.cid);
    }, 100);
  };
  return (
    <Card elevation={3}
      sx={{ width: cardWidth, borderRadius: "10px" }}>
      <CardActionArea
        onClick={handleEnterCircle}
        sx={{
          borderRadius: '5px',
          '&:hover': {
            '& .MuiCardMedia-root': {
              opacity: 0.95,
            },
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          },
          transition: 'background-color 0.3s', // 添加显示隐藏的过渡效果
        }}
      >
        <CardMedia
          component="img"
          sx={{
            transition: 'opacity 0.3s', // 添加显示隐藏的过渡效果
            overflow: 'hidden',
            height: imgHeight,
            maxHeight: imgHeight,
            objectFit: 'cover',
          }}
          image={circle.image}
          alt="circle image"
        />
        <CardContent
          sx={{ height: textHeght, maxHeight: textHeght }}>
          <Typography
            gutterBottom variant="h6"
            component="div"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {circle.cname}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {circle.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActionArea
        sx={{
          display: (isJoined == null) ? 'none' : 'flex',
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
