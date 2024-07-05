// src/components/CircleCard/CircleCard.jsx
// import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function CircleCard({ circle, cardWidth, onEnterCircle, onJoinOrLeaveCircle }) {
  const [isJoined, setIsJoined] = useState(circle.isJoined);

  const imgHeightMin = 0.618 * cardWidth, imgHeightMax = 1.618 * cardWidth;
  const handleJoinOrLeaveCircle = (event) => {
    console.log('Joins circle:', circle.cname);
    isJoined ? setIsJoined(false) : setIsJoined(true);
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
      sx={{ width: cardWidth, borderRadius: "20px" }}>
      <CardActionArea
        onClick={handleEnterCircle}
        sx={{
          borderRadius: '5px',
          '&:hover': {
            '& .MuiCardMedia-root': {
              opacity: 0.95,
            },
            backgroundColor: 'rgba(0, 0, 0, 0.3)', // 修改为您想要的颜色和透明度
          },
          transition: 'background-color 0.3s', // 添加显示隐藏的过渡效果
        }}
      >
        <CardMedia
          component="img"
          sx={{ 
            minHeight: imgHeightMin, 
            maxHeight: imgHeightMax, 
            transition: 'opacity 0.3s', // 添加显示隐藏的过渡效果
          }}
          image={circle.image}
          alt="circle image"
        />
        <CardContent >
          <Typography gutterBottom variant="h6" component="div">
            {circle.cname}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {circle.description}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActionArea
        sx={{
          display: 'flex',
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
