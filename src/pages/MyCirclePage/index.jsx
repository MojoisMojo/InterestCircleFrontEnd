import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Box, ButtonBase, Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

import UserContext from '../../context/UserContext';

import PostSender from '../../components/Post/PostSender';
import Post from '../../components/Post/Post';
import PostsLayout from '../../components/Post/PostsLayout';

import { getAllCirclesRequest } from '../../server/userInfo';
import { getCirclePostsRequest } from '../../server/circles';

import { static_circle_posts, static_circles } from '../../assets/static';
import { sleep } from '../../utils/sleep';
import AdivertiseCard from '../../components/Adivertise';
import UsersList from '../../components/UsersList';
import { Divider } from '@mui/material';
import UserInfoCard from '../../components/UserInfoCard';

export default function MyCirclePage() {
  const { currUser, setCurrUser } = useContext(UserContext);
  const [myCircles, setMyCircles] = useState([]);
  const [currCircleIdx, setCurrCircleIdx] = useState(-1);
  const [currPosts, setCurrPosts] = useState([]);
  const [currCid, setCurrCid] = useState('');
  async function getAndsetMyCircles() {
    let res = await getAllCirclesRequest(currUser.uid);
    if (res.status !== 'success') {
      alert(res.msg);
      return;
    }
    let circles = res.data.circles;
    // console.log(circles);
    setMyCircles(circles);
    setCurrCircleIdx(0);
  };
  async function getAndsetPosts(cid) {
    let res = await getCirclePostsRequest(cid);
    if (res.status !== 'success') {
      alert(res.msg);
      return;
    }
    console.log(res.msg);
    let posts = res.data.posts;
    setCurrPosts(posts);
  };

  useEffect(() => {
    getAndsetMyCircles()
  }, []);
  useEffect(() => {
    if (currCircleIdx < 0) return;
    getAndsetPosts(myCircles[currCircleIdx].cid);
    setCurrCid(myCircles[currCircleIdx].cid)
  }, [currCircleIdx]);

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
        rowSpacing={{ xs: 1, sm: 2, md: 3 }}
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
              <Typography variant='h6' fontWeight='bold' marginBottom={1}> 活跃用户 </Typography>
              <Divider variant="fullWidth" />
              <UsersList cid={currCid} />
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
            <PostSender circles={[myCircles[currCircleIdx]]} />
          </Grid>
          {/* circles To Selected */}
          <Grid item
            // height='135px' // 无滚动条时的高度
            // height='150px' // 有滚动条时的高度
            height='fit-content'
            maxHeight='180px'
            container
            display="flex"
            alignItems="center"
          >
            <Paper
              item
              elevation={3}
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: '8px',
                padding: 0,
                margin: 'auto',
                display: "flex",
                objectFit: 'hidden',
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Box
                margin='auto'
                display="flex"
                alignItems="flex-end"
                justifyContent="flex-start"
                height='100%'
                columnGap={1}
                sx={{
                  overflowX: 'auto',
                  overflowY: 'hidden',
                  // // 隐藏滚动条
                  // '&::-webkit-scrollbar': {
                  //   display: 'none',
                  // },
                  // 滚动条放在上方
                  transform: 'scaleY(-1)',
                  // 设置滚动条高度
                  scrollbarWidth: 'thin !important',
                }}
                paddingX={2}
                paddingTop={2}
                paddingBottom={3}
              >
                {myCircles.map((circle, index) => (
                  <Grid
                    item
                    component='button'
                    key={index}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    width={70}
                    minWidth={70}
                    onClick={
                      () => {
                        console.log('click', index);
                        if (index !== currCircleIdx) { setCurrCircleIdx(index) }
                      }
                    }
                    // 悬停效果
                    // 头像边框 和 文字变蓝
                    sx={{
                      transform: 'scaleY(-1)',
                      '&:hover .mAvatar': {
                        boxShadow: '0 0 0 1.5px rgb(0, 174, 236)',
                        transition: 'box-shadow 0.35s',
                      },
                      '&:hover .mText': {
                        color: 'rgb(0, 174, 236)',
                        transition: 'color 0.35s',
                      },
                    }}
                  >
                    <Avatar
                      src={circle.cicon}
                      className='mAvatar'
                      sx={{
                        width: 54, height: 54,
                        backgroundColor: 'transparent',
                        border: '1.5px solid #00000000',
                        boxShadow:
                          (index === currCircleIdx
                            ? '0 0 0 1.5px rgb(0, 174, 236)'
                            : '0 0 0 1.5px #00000000'
                          ),
                        transition: 'box-shadow 0.35s ease-in-out',
                      }}
                    />
                    <Typography
                      className='mText'
                      variant="body2"
                      sx={{
                        marginTop: 0.5,
                        WebkitLineClamp: 1,
                        textAlign: 'center',
                        lineHeight: '1.125rem',
                        wordBreak: 'break-all',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontSize: '0.8125rem',
                        color: (
                          (index === currCircleIdx)
                            ? "rgb(0, 174, 236)"
                            : "#6d757a"
                        ),
                        transition: 'color 0.35s ease-in-out',
                        fontWeight: '400',
                        fontFamily: 'PingFang SC,HarmonyOS_Regular,Helvetica Neue,Microsoft YaHei,sans-serif!important'

                      }}
                    >
                      {circle.cname}
                    </Typography>
                  </Grid>
                ))}
              </Box>
            </Paper>
          </Grid>
          {/* Posts */}
          <PostsLayout posts={currPosts} />
        </Grid>
        {/* right */}
        <Grid item xs={0} sm={0} md={3} lg={2.5}
          display={{ xs: 'none', md: 'flex' }}
          container
          direction='column'
          rowSpacing={{ xs: 1, sm: 2 }}
        >
          <Grid item width={'100%'}>
            <UserInfoCard
              bio={currUser.bio}
              name={currUser.name}
              avatar={currUser.avatarUrl}
              circlesCount={currUser.circlesCount}
              likesCount={currUser.likesCount}
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