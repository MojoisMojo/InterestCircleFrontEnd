import { parsePath, useNavigate } from 'react-router-dom'
import CirclePage from '../CirclePage'
import VerticalCircleCard from '../../components/CircleCard/VerticalCard'
import TransverseCircleCard from '../../components/CircleCard/TransverseCard'
import FixHeightCircleCard from '../../components/CircleCard/FixHeightCard'
import { static_circles } from '../../assets/static';
import { useContext, useState } from 'react';
import UserContext from '../../context/UserContext';
import { ButtonBase, Grid } from '@mui/material';
import UserInfoCard from '../../components/UserInfoCard';
import AdivertiseCard from '../../components/Adivertise';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

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
    <div style={{
      width: '100%',
      padding: 'auto',
      margin: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Grid container
        paddingTop={{ xs: 2, sm: 3 }}
        paddingRight={{ xs: 1, sm: 2, md: 3 }}
        marginLeft={{ xs: '10px', sm: 'calc(3% - 10px)', md: 'calc(7.5% - 40px)' }}
        marginRight={{ xs: '10px', sm: 'calc(3% - 10px)', md: 'calc(7.5% - 40px)' }}
        sx={{
          width:
            { xs: 'calc(100% - 20px)', sm: 'calc(94% + 20px)', md: 'calc(85% + 80px)' },
        }}
        maxWidth='calc(min(90%, 1980px))'
        direction='row'
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        alignItems='flex-start'
        justifyContent='center'
        textAlign={'center'}
        justifySelf={'center'}
      >
        {/* left */}
        <Grid item xs={0} sm={0} md={0} lg={2}
          display={{ xs: 'none', lg: 'flex' }}
          container
          direction='column'
          rowSpacing={{ xs: 1, sm: 2 }}
        >
          <Grid item width={'100%'}>
            <UserInfoCard
              bio={currUser.bio}
              name={currUser.name}
              avatar={currUser.avatarUrl}
              circleCount={currUser.circleCount}
              likeCount={currUser.likeCount}
            />
          </Grid>
          <Grid item>
            <Paper sx={{ paddingTop: 1, borderRadius: '10px' }} elevation={3}>
              <Typography variant='h6' fontWeight='bold' marginBottom={1}>
                活跃圈子
              </Typography>
              <Divider variant="fullWidth" />
              TBC
            </Paper>
          </Grid>
          <Grid item>
            <AdivertiseCard />
          </Grid>
        </Grid>
        {/* middle */}
        <Grid item xs={12} sm={11} md={8.5} lg={7.5}
          container
          direction='column'
          rowSpacing={{ xs: 1, sm: 2 }}
        >
          <Grid item sx={{ width: "100%", backgroundColor: 'yellow' }}>
            <ButtonBase sx={{ width: '100%' }}>
              Create A Circle
            </ButtonBase>
          </Grid>
          <Grid item container
            spacing={2}
            paddingRight={2}
            width='100%'
            margin='auto'
            display='flex'
            justifyContent='flex-start'
            direction='row'
          >
            {circles.map(circle => (
              <Grid
                item xs={10} sm={6} md={6} lg={4} xl={2.4}
                key={circle.id}
              >
                <FixHeightCircleCard
                  circle={circle}
                  cardWidth='100%'
                  onEnterCircle={onEnterCircle}
                  onJoinOrLeaveCircle={onJoinOrLeaveCircle} />
              </Grid>
            ))}
          </Grid>

        </Grid>
        {/* right */}
        <Grid item xs={0} sm={0} md={3} lg={2.5}
          display={{ xs: 'none', md: 'flex' }}
          container
          direction='column'
          rowSpacing={{ xs: 1, sm: 2 }}
        >
          <Grid item>
            <AdivertiseCard />
          </Grid>
          <Grid item>
            <AdivertiseCard />
          </Grid>
        </Grid>
      </Grid >

    </div >
  )
}

export default FindCirclesPage
