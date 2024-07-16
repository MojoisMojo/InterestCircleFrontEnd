// src/components/CircleCard/TransverseCard/TransverseCircleCard.jsx
// import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Grid } from '@mui/material';

export default function TransverseCircleCard({ circle, cardHeight, onEnterCircle, onJoinOrLeaveCircle }) {
  const [isJoined, setIsJoined] = useState(circle.isJoined);

  const cardWidthMin = 1.618 * cardHeight, cardWidthMax = 3 * 1.618 * cardHeight;
  const cardWidth = cardHeight * 1.618 * 2;
  const imgWidth = cardHeight * 0.85, imgHeight = cardHeight * 0.85;
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
      sx={{
        minWidth: cardWidthMin, maxWidth: cardWidthMax,
        width: cardWidth,
        height: cardHeight,
        borderRadius: "10px",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
      <Grid sx={{ width: "7%", maxWidth: "25px" }} />
      <CardActionArea
        onClick={handleEnterCircle}
        sx={{
          width: "75%",
          display: "flex",
          borderRadius: '5px',
          justifyContent: "left",
        }}
      >
        <Grid sx={{ height: imgHeight, }}>
          <CardMedia
            component="img"
            sx={{
              width: imgWidth,
              borderRadius: '5px',
              height: "100%",
            }}
            image={circle.image}
            alt="circle image"
          />
        </Grid>
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
          borderRadius: '5px',
          width: '25%',
          maxHeight: "150px",
          height: "85%",
        }}
        onClick={handleJoinOrLeaveCircle}
      >
        <Typography size="small" color="primary" >
          {isJoined ? "退出圈子" : "加入圈子"}
        </Typography>
      </CardActionArea>
      <Grid sx={{ width: "5%", maxWidth: "20px" }} />
    </Card>
  );
}