import { parsePath, useNavigate } from 'react-router-dom'
import CirclePage from '../CirclePage'
import VerticalCircleCard from '../../components/CircleCard/VerticalCard'
import TransverseCircleCard from '../../components/CircleCard/TransverseCard'
import FixHeightCircleCard from '../../components/CircleCard/FixHeightCard'

import { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/UserContext';
import { ButtonBase, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import UserInfoCard from '../../components/UserInfoCard';
import AdivertiseCard from '../../components/Adivertise';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

import { static_circles } from '../../assets/static';
import { static_circles_joined } from '../../assets/static';
import { getInterestCirclesRequest, joinOrleaveCircleRequest } from '../../request/circles';
import CircleCreater from '../../components/CircleCreater'

function FindCirclesPage() {
  const navigate = useNavigate();
  const [circles, setCircles] = useState([]);
  const [circlesJoined, setCirclesJoined] = useState({});
  const { currUser, setCurrUser } = useContext(UserContext);

  const [buttonOn, setButtonOn] = useState(false);

  async function onJoinOrLeaveCircle(cId, isJoined) {
    console.log('Join or leave circle:', cId);
    let res = await joinOrleaveCircleRequest(cId, currUser.uid, !isJoined);
    if (res.status !== 'success') {
      alert(res.msg);
      return;
    }
    alert('操作成功');
    let newJoined = { ...circlesJoined };
    newJoined[cId] = res.data.isJoined;
    console.log('oldJoined:', circlesJoined, 'newJoined:', newJoined);
    setCirclesJoined(newJoined);
  };
  async function onEnterCircle(cId) {
    navigate(`/circle?id=${cId}`);
  };

  async function getInterestCircles() {
    let res = await getInterestCirclesRequest(currUser.uid);
    if (res.status !== 'success') {
      alert(res.msg);
      return;
    }
    console.log(res);
    setCircles(res.data.circles);
    setCirclesJoined(res.data.circlesJoined);
  }
  // 初始化
  useEffect(() => {
    getInterestCircles();
  }, []);

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
          <Grid item sx={{ width: '100%' }}>
            <Paper sx={{ paddingTop: 1, borderRadius: '10px' }} elevation={3}>
              <Typography variant='h6' fontWeight='bold' marginBottom={1}>
                活跃圈子
              </Typography>
              <Divider variant="fullWidth" />
              TBC 敬请期待
            </Paper>
          </Grid>
          <Grid item sx={{ width: '100%' }}>
            <AdivertiseCard />
          </Grid>
        </Grid>
        {/* middle */}
        <Grid item xs={12} sm={11} md={8.5} lg={7.5}
          container
          direction='column'
          rowSpacing={{ xs: 1, sm: 2 }}
        >
          <Grid item
            sx={{
              width: "calc(100% - 8px)", margin: 'auto',
              // transition: 'max-height 0.5s ease, opacity 0.5s ease',
            }}
          >
            {(buttonOn) ?
              <CircleCreater onCreate={() => {
                setButtonOn(false)
                getInterestCircles();
              }} /> :
              <Button
                variant="outlined"
                sx={{
                  width: '100%', height: '50px',
                  padding: 0,
                }}
                onClick={() => { setButtonOn(true) }}
              >
                找不到感兴趣的？自己创建一个！
              </Button>
            }
          </Grid>
          <Grid item container
            spacing={2}
            paddingRight={2}
            margin='auto'
            display='flex'
            justifyContent='flex-start'
            direction='row'
          >
            {circles.map(circle => {
              return (

                <Grid
                  item xs={12} sm={6} md={4} lg={4} xl={3}
                  key={circle.cid}
                  width='100%'
                >
                  <FixHeightCircleCard
                    circle={circle}
                    cardWidth='100%'
                    onEnterCircle={onEnterCircle}
                    onJoinOrLeaveCircle={onJoinOrLeaveCircle}
                    isJoined={circlesJoined[circle.cid]}
                  />
                </Grid>
              )
            })}
          </Grid>

        </Grid>
        {/* right */}
        <Grid item xs={0} sm={0} md={3} lg={2.5}
          display={{ xs: 'none', md: 'flex' }}
          container
          direction='column'
          rowSpacing={{ xs: 1, sm: 2 }}
        >
          <Grid item width={'100%'}>
            {(!currUser.uid) ? <AdivertiseCard advertise={
              {
                title: '登陆一下吧',
                content: '点我登录',
                color: '#4B5563',
                textcolor: '#E8EAF6',
                href: '/login',
              }
            } /> : <UserInfoCard
              bio={currUser.bio}
              name={currUser.name}
              avatar={currUser.avatarUrl}
              circlesCount={currUser.circlesCount}
              likesCount={currUser.likesCount}
            />}

          </Grid>
          <Grid item sx={{ width: '100%' }}>
            <AdivertiseCard />
          </Grid>
          <Grid item sx={{ width: '100%' }}>
            <AdivertiseCard />
          </Grid>
        </Grid>
      </Grid >

    </div >
  )
}

export default FindCirclesPage
