import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Box, ButtonBase, Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

import UserContext from '../../context/UserContext';

import PostSender from '../../components/Sender/PostSender';
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
          <Grid item>
            <Paper sx={{ paddingTop: 1, borderRadius: '10px' }} elevation={3}>
              <Typography variant='h6' fontWeight='bold' marginBottom={1}> 活跃用户 </Typography>
              <Divider variant="fullWidth" />
              <UsersList cid={currCid} />
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
            <PostSender circles={[myCircles[currCircleIdx]]} />
          </Grid>
          {/* circles To Selected */}
          <Grid item
            height='120px'
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
                alignItems="center"
                justifyContent="center"
                height='100%'
              >
                {myCircles.map((circle, index) => (
                  <Grid
                    item
                    component='button'
                    key={index}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    columnSpacing={1}
                    width={70}
                  >
                    <Avatar
                      src={circle.cicon}
                      sx={{ width: 50, height: 50, backgroundColor: 'primary.main' }}
                    />
                    <Typography variant="caption">{circle.cname}</Typography>
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