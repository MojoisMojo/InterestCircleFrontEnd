import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
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
      <CssBaseline />
      <Grid container direction="column" spacing={2}>
        {/* Poster info & post's time */}
        <Grid item container direction="row" alignItems="center">
          <Grid item xs={8} container spacing={1} alignItems="center">
            <Grid item xs={2}>
              <ButtonBase sx={{ width: 50, height: 50 }}>
                <Img alt="complex" src={poster.avatarUrl} sx={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover' }}/>
              </ButtonBase>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" class="front-bold font-serif">
                {poster.name}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" sx={{ textAlign: 'right' }}>
              {post.time}
            </Typography>
          </Grid>
        </Grid>
        {/* Post's content */}
        <Grid item xs={12}>
          <Typography gutterBottom variant="subtitle1" component="div" sx={{ fontFamily: 'monospace' }}>
            {post.content}
          </Typography>
          {/* Post's images */}
          <Grid container rowSpacing={1} columnSpacing={1}>
            {post.img.map((img) => (
              <Grid item xs={6} key={img.id}>
                <Img alt="complex" src={img} sx={{borderRadius: '2%', objectFit:'cover'}}/>
              </Grid>
            ))}
          </Grid>
        </Grid>
        {/* Acted info of the post */}
        <Grid item container direction="row" spacing={2} sx={{ height: '100%' }}>
          {['Watches', 'Stars', 'Likes'].map((info, index) => (
            <Grid item xs={4} key={index} sx={{ height: '150%' }}>
              <ButtonBase sx={{ width: '100%', justifyContent: 'center'}} variant="h5" component="div">
                {info}: {post.actinfo[info.toLowerCase()]}
              </ButtonBase>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
}