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
const FlexImg = styled('img')({
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
          p: 1,
          margin: 'auto',
          maxWidth: '550px',
          flexGrow: 1,
          backgroundColor: '#fff',
        }}
      >
        <Grid container direction="column" spacing={2}>
          {/* Poster info & post's time */}
          <Grid item container direction="row" alignItems="center" justifyContent="space-between">
            <Grid item xs={7} md={5}
              container direction="row"
              spacing={2}
              alignItems="center"
              justifyContent='flex-start'
            >
              <Grid item justifyContent='flex-start'
                sx={{
                  width: '60px',
                }}
              >
                <ButtonBase sx={{
                  height: 50,
                  width: 50,
                }}>
                  <Img alt="complex" src={poster.avatarUrl}
                    sx={{
                      width: 50,
                      height: 'auto',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }} />
                </ButtonBase>
              </Grid>
              <Grid item >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: {
                      xs: '0.8rem', // 小屏幕
                      sm: '1rem', // 小型设备
                      md: '1.2rem', // 中型设备
                    }
                  }}
                >
                  {poster.name}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={0} md={4} />
            <Grid item xs={5} md={3} justifyContent="flex-end" sx={{ textAlign: 'right' }}>
              <Typography
                variant="overline"
                sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
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
                <Grid item xs={6} key={img.id} sx={{ display: 'flex' }}>
                  <ButtonBase
                    sx={{
                      width: '100%', flex: '1 1 auto',
                      objectFit: 'cover',
                      overflow: 'hidden',
                    }}
                    onClick={() => handleClickOpenImg(img)}
                  >
                    <Img
                      alt="img"
                      src={img}
                      sx={{
                        width: '100%',
                        borderRadius: '2%',

                      }}
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
                <ButtonBase
                  sx={{
                    height: '100%', width: '100%',
                    justifyContent: 'center'
                  }}
                  variant="h5" component="div"
                >
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
          alignItems: 'center',     // 垂直居中
          justifyContent: 'center', // 水平居中
        }}
      >
        <FlexImg
          alt="img"
          src={selectedImg}
          sx={{
            objectFit: 'contain',
            maxHeight: 'calc(100vh - 64px)', // 不要动它！至少不要改得比他大！
            width: 'auto',
          }}
        />
      </Dialog>
    </>
  );
}