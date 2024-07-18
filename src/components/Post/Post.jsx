import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import ImgViewer from '../ImgViewer';
import Avatar from '@mui/material/Avatar';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const Int2sStr = (int) => {
  if (int < 1e3) { return int.toString(); } // 0~999
  if (int < 1e4) { return (int / 1e3).toFixed(1) + 'k'; } // 1.0k ~ 9.9k
  if (int < 1e6) { return (int / 1e4).toFixed(1) + 'w'; } // 1.0w ~ 99.9w
  if (int < 1e8) { return (int / 1e6).toFixed(1) + 'm'; } // 1.0m ~ 99.9m
  if (int < 1e9) { return (int / 1e6).toFixed(0) + 'm'; } // 100m ~ 999m
  if (int < 1e10) { return (int / 1e9).toFixed(1) + 'bn'; } // 1.0b ~ 9.9bn
  return '10bn+';
}
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
          p: 3,
          paddingTop: 2,
          margin: 'auto',
          maxWidth: '750px',
          flexGrow: 0.5,
          backgroundColor: '#fff',
        }}
      >
        <Grid container 
          direction="column" 
          spacing={2}
          alignItems='center'
        >
          {/* Poster info & post's time */}
          <Grid item container direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            {/** poster's avatar */}
            <Grid item
              sx={{ width: 50 }}
              justifyContent={{ xs: 'flex-start', sm: 'center' }}
            >
              <ButtonBase sx={{
                height: 50,
                width: 50,
              }}>
                <Avatar alt="Avatar" src={poster.avatarUrl}
                  sx={{
                    width: 50,
                    height: 50,
                  }} />
              </ButtonBase>
            </Grid>
            <Grid item
              sx={{ width: 'calc(100% - 60px)' }}
              container
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems={{ xs: 'flex-start', sm: "center" }}
              justifyContent={{ xs: 'center', sm: 'space-between' }}
              paddingTop={{ xs: '10px', sm: '16px' }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  fontSize: {
                    xs: '1rem', // 小屏幕
                    sm: '1.2rem', // 小型设备
                    // md: '1.2rem', // 中型设备
                  },
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {poster.name}
              </Typography>
              <Typography
                variant="overline"
                sx={{
                  lineHeight: '1',
                  fontSize: {
                    xs: '0.8rem', // 小屏幕
                    sm: '1rem', // 小型设备
                  },
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
          <Grid item container 
            sx = {{width:{xs:'100%', sm:'80%'}}}
            paddingTop='8px !important'
          >
            <Typography
              variant="body2"
              component="div"
              sx={{
                width: '100%',
                fontFamily: 'monospace',
                fontSize: {
                  xs: '1rem', // 小屏幕
                  sm: '1.1rem', // 小型设备
                  lg: '1.2rem', // 大型设备
                },
              }}
            >
              {post.content}
            </Typography>
            {/* Post's images */}
            <Grid item container rowSpacing={1} columnSpacing={1} paddingTop='8px !important'>
              {post.img.map((img) => (
                <Grid item xs={4} key={img.id} sx={{ display: 'flex' }}>
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
          <Grid item container 
            direction="row" 
            spacing={0.5} 
            sx={{ height: '60px' }}
            justifyContent='center'
          >
            {post.actinfo.map((info, index) => (
              <Grid container item xs={3} key={index} sx={{ height: '100%' }}>
                <ButtonBase
                  sx={{
                    height: '100%', width: '100%',
                    justifyContent: 'center'
                  }}
                >
                  <Typography

                  >
                    {info.name}:{Int2sStr(info.value)}
                  </Typography>
                </ButtonBase>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Paper>
      <ImgViewer
        open={imgOpen}
        img={selectedImg}
        onClose={handleClose}
      />
    </>
  );
}