import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import CssBaseline from '@mui/material/CssBaseline';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});
const FullImg = styled('img')({
  margin: 'auto',
  padding: 'auto',
});


export default function Post({ poster, post }) {
  const [imgOpen, setImgOpen] = React.useState(false);
  const [selectedImg, setSelectedImg] = React.useState('');
  const handleClickOpenImg = (imgUrl) => {
    setSelectedImg(imgUrl);
    setImgOpen(true);
  };

  const handleClose = () => {
    setImgOpen(false);
  };
  return (
    <>
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
                  <Img alt="complex" src={poster.avatarUrl} sx={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover' }} />
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
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              sx={{ fontFamily: 'monospace' }}
            >
              {post.content}
            </Typography>
            {/* Post's images */}
            <Grid container rowSpacing={1} columnSpacing={1}>
              {post.img.map((img) => (
                <Grid item xs={6} key={img.id}>
                  <ButtonBase
                    sx={{ width: '100%', }}
                    onClick={() => handleClickOpenImg(img)}
                  >
                    <Img
                      alt="img"
                      src={img}
                      sx={{ borderRadius: '2%', objectFit: 'cover' }}
                    />
                  </ButtonBase>
                </Grid>
              ))}
            </Grid>
            {/* Post's images dialog */}
          </Grid>
          {/* Acted info of the post */}
          <Grid item container direction="row" spacing={0.5} sx={{ height: '60px' }}>
            {post.actinfo.map((info, index) => (
              <Grid item xs={4} key={index} sx={{ height: '100%' }}>
                <ButtonBase sx={{ height: '100%', width: '100%', justifyContent: 'center' }} variant="h5" component="div">
                  <Typography> {info.name}: {info.value} </Typography>
                </ButtonBase>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Paper>
      <Dialog
        open={imgOpen}
        onClose={handleClose}
        sx={{
          alignItems: 'center', // 垂直居中
          justifyContent: 'center', // 水平居中
          height: '100vh',
          width: '100vw',
          overflow: 'clip',
          padding: 'auto',
        }}
      >
        <FullImg
          alt="img"
          src={selectedImg}
          sx={{
            objectFit: 'contain', // 图片填充方式，保持图片长宽比的同时填充容器
            maxHeight: '100vh', // 最大高度限制为视口高度的 85%
            maxWidth: '100%', // 确保图片宽度不超过容器宽度
            overflow: 'clip',
          }}
        />
      </Dialog>
    </>
  );
}