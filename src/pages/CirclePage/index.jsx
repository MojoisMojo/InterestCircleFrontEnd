import React, { useContext, useEffect, useState } from 'react';
import { Grid, Typography, Paper, Divider, ButtonBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import UserContext from '../../context/UserContext';

import PostSender from '../../components/Post/PostSender';
import PostsLayout from '../../components/Post/PostsLayout';
import AdivertiseCard from '../../components/Adivertise';
import UsersList from '../../components/UsersList';
import CircleInfoCard from '../../components/CircleCard/CircleInfoCard';

import {
  getCircleInfoRequest,
  joinOrleaveCircleRequest
} from '/src/request/circles';
import { getCirclePostsRequest } from '/src/request/post';
import { static_empty_circle_info, static_post } from '../../assets/static';
import { isMemberRequest } from '../../request/circles';

static_post;
export default function CirclePage() {
  const { currUser, setCurrUser } = useContext(UserContext);
  const [currPosts, setCurrPosts] = useState([]);
  const [currCircle, setCurrCircle] = useState({ ...static_empty_circle_info });
  const [isJoined, setIsJoined] = useState(null);
  const navigate = useNavigate();

  function handleJoinOrLeaveCircle(event) {
    console.log('Join or leave circle:', currCircle.cname);
    joinOrleaveCircleRequest(
      currCircle.cid, currUser.uid, !isJoined
    ).then(res => {
      if (res.status !== 'success') {
        alert(res.msg);
        return;
      }
      alert('操作成功');
      setIsJoined(res.data.isJoined);
    });

  }
  async function getAndsetCircle(cid, uid) {
    let res = await getCircleInfoRequest(cid, uid);
    console.log('circlePage, getAndsetCircle:', res);
    if (res.status !== 'success') {
      alert(res.msg);
      navigate('/NotFound');
      return;
    }
    let circle = res.data.circle;
    setCurrCircle(circle);
    if (!uid) return;
    // do not set Joined until we get the userUid
    let isJoined = res.data.isJoined;
    setIsJoined(isJoined);
  };

  async function getAndSetIsJoined(cid, uid) {
    let res = await isMemberRequest(cid, uid);
    console.log('circlePage, getAndSetIsJoined:', res);
    if (res.status !== 'success') {
      alert(res.msg);
      return;
    }
    setIsJoined(res.data.isJoined);
  }

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
      getAndsetCircle(circleId, currUser.uid);
      getAndsetPosts(circleId);
    }
    else {
      navigate('/NotFound');
    }
  }, []);

  // 设置是否已经加入圈子
  useEffect(() => {
    if (!currCircle.cid) {
      setIsJoined(null);
      return;
    }
    // 使用URLSearchParams解析当前URL中的查询参数
    const queryParams = new URLSearchParams(window.location.search);
    const circleId = queryParams.get('id'); // 假设URL是这样的: /circle/?id=123
    if (circleId) {
      getAndSetIsJoined(circleId, currUser.uid);
    }
    else {
      navigate('/NotFound');
    }
  }, [currUser.uid]);

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
                活跃用户
              </Typography>
              <Divider variant="fullWidth" />
              <UsersList cid={currCircle.cid} />
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
          <Grid item sx={{ width: "100%" }}>
            <PostSender circles={isJoined ? [currCircle] : []} />
          </Grid>
          <Grid item sx={{ width: "100%" }} display={{ xs: 'flex', md: 'none' }}>
            <CircleInfoCard
              cicon={currCircle.cicon}
              cname={currCircle.cname}
              cdesc={currCircle.cdesc}
              cusernumber={currCircle.cmembers}
              cpostnumber={currCircle.cposts}
              isJoined={isJoined}
              handleJoinOrLeaveCircle={handleJoinOrLeaveCircle}
            />
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
          <Grid item sx={{ width: "100%" }}>
            <CircleInfoCard
              cicon={currCircle.cicon}
              cname={currCircle.cname}
              cdesc={currCircle.cdesc}
              cusernumber={currCircle.cmembers}
              cpostnumber={currCircle.cposts}
              isJoined={isJoined}
              handleJoinOrLeaveCircle={handleJoinOrLeaveCircle}
            />
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
  );
};