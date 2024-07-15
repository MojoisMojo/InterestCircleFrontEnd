import { parsePath, useNavigate } from 'react-router-dom'
import CirclePage from '../CirclePage'
import CircleCard from '../../components/CircleCard/CircleCard'
import { static_circles } from '../../assets/static';
import { useContext, useState } from 'react';
import UserContext from '../../context/UserContext';
import { sleep } from '../../utils/sleep';
import { Grid } from '@mui/material';
function FindCirclesPage() {
  // Assuming you have an array of circle data
  const navigate = useNavigate();
  const circles = static_circles;
  const { currUser, setCurrUser } = useContext(UserContext);
  const { columnNum, setColumnNum } = useState(3);
  async function onJoinOrLeaveCircle(cId, isJoined) {

  };
  async function onEnterCircle(cId) {
    navigate(`/circle?id=${cId}`);
  };

  return (
    <Grid container spacing={2} sx={{padding:'20px'}} justifyContent={"center"}>
      {circles.map(circle => (
        <Grid item xs={6} sm={5} md={4} lg={3} xl={2.4} key={circle.id}>

          <CircleCard
            key={circle.id}
            circle={circle}
            cardWidth={"100%"}
            onEnterCircle={onEnterCircle}
            onJoinOrLeaveCircle={onJoinOrLeaveCircle} />
        </Grid>
      ))}
    </Grid>
  )
}

export default FindCirclesPage
