import React, { useContext, useEffect, useState } from 'react';
import { Grid, Typography, Paper, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import UserContext from '../../context/UserContext';

import PostSender from '../../components/Sender/PostSender';
import PostsLayout from '../../components/Post/PostsLayout';
import AdivertiseCard from '../../components/Adivertise';
import UsersList from '../../components/UsersList';
import CircleInfoCard from '../../components/CircleCard/CircleInfoCard';

import { getCirclePostsRequest, getCircleInfoRequest } from '/src/server/circles';

import { static_empty_circle_info } from '../../assets/static';
export default function CirclePage() {
  const { currUser, setCurrUser } = useContext(UserContext);
  const [currPosts, setCurrPosts] = useState([]);
  const [currCircle, setCurrCircle] = useState({...static_empty_circle_info});
  const navigate = useNavigate();

  async function getAndsetCircle(cid) {
    let res = await getCircleInfoRequest(cid);
    if (res.status !== 'success') {
      alert(res.msg);
      navigate('/NotFound');
      return;
    }
    let circle = res.data.circle;
    setCurrCircle(circle);
  };
  async function getAndsetPosts(cid) {
    let res = await getCirclePostsRequest(cid);
    if (res.status !== 'success') {
      alert(res.msg);
      return;
    }
    let posts = res.data.posts;
    setCurrPosts(posts);
  };

  useEffect(() => {
    // 使用URLSearchParams解析当前URL中的查询参数
    const queryParams = new URLSearchParams(window.location.search);
    const circleId = queryParams.get('id'); // 假设URL是这样的: /circle/?id=123
    if (circleId) {
      getAndsetCircle(circleId);
      getAndsetPosts(circleId);
    }
    else {
      navigate('/NotFound');
    }
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
          <Grid item width={'100%'}>
            <CircleInfoCard
              cicon={currCircle.cicon}
              cname={currCircle.cname}
              cdesc={currCircle.cdesc}
              cusernumber={currCircle.cusers}
              cpostnumber={currCircle.cposts}
            />
          </Grid>
          <Grid item>
            <Paper sx={{ paddingTop: 1, borderRadius: '10px' }} elevation={3}>
              <Typography variant='h6' fontWeight='bold' marginBottom={1}>
                活跃用户
              </Typography>
              <Divider variant="fullWidth" />
              <UsersList cid={currCircle.cid} />
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
          <Grid item sx={{ width: "100%" }}>
            <PostSender circles={[currCircle]} />
          </Grid>
          <PostsLayout posts={currPosts} />
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
  );
};