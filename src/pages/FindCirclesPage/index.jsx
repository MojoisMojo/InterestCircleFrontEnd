import { parsePath, useNavigate } from 'react-router-dom'
import CirclePage from '../CirclePage'
import VerticalCircleCard from '../../components/CircleCard/VerticalCard'
import TransverseCircleCard from '../../components/CircleCard/TransverseCard'
import { static_circles } from '../../assets/static';
import { useContext, useState } from 'react';
import UserContext from '../../context/UserContext';
import { Grid } from '@mui/material';
function FindCirclesPage() {
  const navigate = useNavigate();
  const circles = static_circles;
  const { currUser, setCurrUser } = useContext(UserContext);
  async function onJoinOrLeaveCircle(cId, isJoined) {

  };
  async function onEnterCircle(cId) {
    navigate(`/circle?id=${cId}`);
  };

  return (
    <Grid container spacing={2}
      sx={{ padding: '20px' }}
      justifyContent={"center"}
      direction='row'
    >
      {circles.map(circle => (
        <Grid 
          item xs={10} sm={5.5} md={3.5} lg={3} xl={2.4} 
          key={circle.id}
        >
          {/* <VerticalCircleCard
            key={circle.id}
            circle={circle}
            cardWidth={"100%"}
            onEnterCircle={onEnterCircle}
            onJoinOrLeaveCircle={onJoinOrLeaveCircle} /> */}
          <TransverseCircleCard
            key={circle.id}
            circle={circle}
            cardHeight='100px'
            onEnterCircle={onEnterCircle}
            onJoinOrLeaveCircle={onJoinOrLeaveCircle} />
        </Grid>
      ))}
    </Grid>
  )
}

export default FindCirclesPage
