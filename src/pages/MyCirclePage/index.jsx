import React, { useContext, useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import Card from '@mui/material/Card';

import UserContext from '../../context/UserContext';

import Post from '../../components/Post/Post';
import PostsLayout from '../../components/Post/PostsLayout';

import { static_circle_posts, static_circles } from '../../assets/static';
import { sleep } from '../../utils/sleep';

export default function MyCirclePage() {
  const { currUser, setCurrUser } = useContext(UserContext);
  const [circles, setCircles] = useState([]);
  const [currCircleIdx, setCurrCircleIdx] = useState(0);
  const [currPosts, setCurrPosts] = useState([]);
  async function getMyCircles() {
    await sleep(1000);
    let circles = static_circles;
    setCircles(circles);
    setCurrCircleIdx(0);
  };
  async function getPosts(cid) {
    await sleep(1000);
    let posts = static_circle_posts;
    setCurrPosts(posts);
  };

  useEffect(() => { getMyCircles() }, []);
  useEffect(() => { getPosts(circles[currCircleIdx]) }, [currCircleIdx]);

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
        marginLeft={{ xs: '10px', sm: 'calc(3% - 10px)', md: 'calc(10% - 40px)' }}
        marginRight={{ xs: '10px', sm: 'calc(3% - 10px)', md: 'calc(10% - 40px)' }}
        sx={{
          width:
            { xs: 'calc(100% - 20px)', sm: 'calc(94% + 20px)', md: 'calc(80% + 80px)' },
        }}
        maxWidth='calc(max(80%, 1280px))'
        direction='row'
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        alignItems='flex-start'
        justifyContent='center'
        textAlign={'center'}
        justifySelf={'center'}
      >
        <Grid item xs={0} sm={0} md={0} lg={2}
          display={{ xs: 'none', lg: 'flex' }}
          container
          direction='column'
        >
          <Box item sx={{ backgroundColor: 'red' }}>
            left
          </Box>
        </Grid>
        <Grid item xs={12} sm={11} md={8.5} lg={7.5} container direction='column'>
          <Grid item sx={{
            backgroundColor: 'yellow',
            height: 150,
          }}>
            <h1>Poster</h1>
          </Grid>
          <PostsLayout posts={currPosts} />
        </Grid>
        <Grid item xs={0} sm={0} md={3} lg={2.5}
          display={{ xs: 'none', md: 'flex' }}
          container
          direction='column'
        >
          <Box item sx={{ backgroundColor: 'red' }}>
            right
          </Box>
        </Grid>
      </Grid >
    </div >
  );
};