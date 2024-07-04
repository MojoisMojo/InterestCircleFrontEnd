import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import CssBaseline from '@mui/material/CssBaseline';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function Post({ poster, post }) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 600,
        flexGrow: 1,
        backgroundColor: '#fff',
      }}
    >
      <Grid container direction="column" spacing={2}>
        {/* poster info & post's time */}
        <Grid item container direction="row" alignItems="center">
          <Grid item xs={8} md={8} container spacing={1} direction="row" alignItems="center">
            <Grid item xs={2} md={2}>
              <ButtonBase sx={{ width: 50, height: 50 }}>
                <Img alt="complex" src={poster.avatarUrl} />
              </ButtonBase>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography class="font-serif" variant="h5" style={{ fontWeight: 'bold' }}>
                {poster.name}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={4} md={4}>
            <Typography variant="body1" textAlign="right" >
              {post.time}
            </Typography>
          </Grid>
        </Grid>
        {/* post's content */}
        <Grid item xs={12} container direction="column" spacing={2}>
          <Grid item container direction="column" spacing={2}>
            {/* post's content */}
            <Grid item>
              <Typography gutterBottom variant="body3" component="div" class="font-mono">
                {post.content}
              </Typography>
            </Grid>
            {/* post's image */}
            <Grid item container rowSpacing={1} columnSpacing={1}>
              <Grid item xs={6}>
                <Item><Img alt="complex" src={post.img} /></Item>
              </Grid>
              <Grid item xs={6}>
                <Item><Img alt="complex" src={post.img} /></Item>
              </Grid>
              <Grid item xs={6}>
                <Item><Img alt="complex" src={post.img} /></Item>
              </Grid>
              <Grid item xs={6}>
                <Item><Img alt="complex" src={post.img} /></Item>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <CssBaseline />
        {/* acted info of the post */}
        <Grid item container direction="row" spacing={2} style={{height:'100%'}}>
          <Grid style={{height:'150%'}} item xs={4}>
            <ButtonBase style={{ width: '100%', justifyContent: 'center' }} variant="body3" component="div">
              Watches: {post.actinfo.watches}
            </ButtonBase>
          </Grid>
          <Grid style={{height:'150%'}} item xs={4}>
            <ButtonBase style={{ width: '100%', justifyContent: 'center' }} variant="body3" component="div">
              Stars: {post.actinfo.stars}
            </ButtonBase>
          </Grid>
          <Grid style={{height:'150%'}} item xs={4}>
            <ButtonBase style={{ width: '100%', justifyContent: 'center' }} variant="body3" component="div">
              Likes: {post.actinfo.likes}
            </ButtonBase>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}