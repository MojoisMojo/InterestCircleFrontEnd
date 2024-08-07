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

export default function TransverseCircleCard({ circle, cardWidth, onEnterCircle, onJoinOrLeaveCircle }) {
  const [isJoined, setIsJoined] = useState(circle.isJoined);
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
        width: cardWidth,
        borderRadius: "10px",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
      <CardActionArea
        onClick={handleEnterCircle}
        sx={{
          width: "100%",
          height: '108px',
          display: "flex",
          borderRadius: '5px',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}
      >
        <Box sx={{
          height: '108px',
          width: '120px',
          minWidth: '80px',
          borderRadius: '5px',
        }}>
          <img
            style={{
              width: 'auto',
              minWidth: '80px',
              height: "100%",
              overflow: 'hidden',
              objectFit: 'cover',
              borderRadius: '5px',
            }}
            src={circle.image}
            alt="circle image"
          />
        </Box>
        <CardContent
          sx={{
            p: 1,
            marginLeft: 0.5,
            justifyContent: 'flex-start',
          }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: { xs: 1, sm: 2 },
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            fontWeight='bold'
            fontSize={{ xs: '1rem', sm: '1.1rem', md: '1.2rem', lg: '1.3rem' }}
          >
            {circle.cname}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: { xs: 2, sm: 3 },
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginLeft: 0.5,
            }}
            fontSize={{ xs: '0.6rem', sm: '0.6rem', md: '0.7rem' }}
          >
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
          width: '100%',
          height: "50px",
        }}
        onClick={handleJoinOrLeaveCircle}
      >
        <Typography size="small" color="primary" >
          {isJoined ? "退出圈子" : "加入圈子"}
        </Typography>
      </CardActionArea>
      <Grid sx={{ width: "5%", maxWidth: "20px" }} />
    </Card >
  );
}
