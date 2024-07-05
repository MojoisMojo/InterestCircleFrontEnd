// src/components/CircleCard/CircleCard.jsx
// import * as React from 'react';
import { useContext, useState } from 'react';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import UserContext from '../../context/UserContext';
import { static_poster } from '../../assets/static';

export default function CircleCard({ circle, onEnterCircle, onJoinOrLeaveCircle }) {
  // const { currUser, setCurrUser } = useContext(UserContext);
  const [currUser, setCurrUser ] = useState({ ...static_poster });
  const [isJoined, setIsJoined] = useState(circle.isJoined);
  const handleJoinOrLeaveCircle = (event)=>{
    console.log('user', currUser.name, 'Joins circle:', circle.cname);
    isJoined?setIsJoined(false):setIsJoined(true);
    onJoinOrLeaveCircle(circle.cid, isJoined);
  };
  
  const handleEnterCircle = (event)=>{
    console.log('enter', circle.cname);
    onEnterCircle(circle.cid);
  };
  return (
    <Card elevation={3} sx={{ maxWidth: 320 }}>
      <CardActionArea onClick={handleEnterCircle}>
        <CardMedia
          component="img"
          height="100"
          image={circle.image}
          alt="circle image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {circle.cname}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {circle.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActionArea
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60px' }}
        onClick={handleJoinOrLeaveCircle}
      >
        <Typography size="small" color="primary" >
          {isJoined?"退出圈子":"加入圈子"}
        </Typography>
      </CardActionArea>
    </Card>
  );
}
