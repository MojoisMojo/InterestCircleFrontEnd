import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import ImgViewer from '../ImgViewer';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
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
          maxWidth: '550px',
          flexGrow: 0.5,
          backgroundColor: '#fff',
        }}
      >
        <Grid container direction="column" spacing={2}>
          {/* Poster info & post's time */}
          <Grid item container direction="row"
            alignItems="center"
            justifyContent="flex-start"
          >
            {/** poster's avatar */}
            <Grid item xs={4} sm={2} md={2}
              justifyContent={{ xs: 'flex-start', sm: 'center' }}
            >
              <ButtonBase sx={{
                height: 50,
                width: 50,
              }}>
                <Img alt="complex" src={poster.avatarUrl}
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }} />
              </ButtonBase>
            </Grid>
            <Grid item xs={8} sm={9.8} md={10}
              container
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems={{ xs: 'flex-end', sm: "center" }}
              justifyContent={{ xs: 'center', sm: 'space-between' }}
              paddingTop={{ xs: '20px', sm: '16px' }}
            >
              <Typography
                variant="h5"
                paddingLeft={{ xs: '0px', sm: '5px' }}
                sx={{
                  fontWeight: 'bold',
                  fontSize: {
                    xs: '1rem', // 小屏幕
                    sm: '1.2rem', // 小型设备
                    // md: '1.2rem', // 中型设备
                  },
                  textAlign: {
                    xs: 'end',
                    sm: 'start',
                  }
                }}
              >
                {poster.name}
              </Typography>
              <Typography
                variant="overline"
                sx={{
                  fontSize: {
                    xs: '0.8rem', // 小屏幕
                    sm: '1rem', // 小型设备
                  },
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  textAlign: 'right',
                }}
              >
                {post.time}
              </Typography>
            </Grid>
          </Grid>
          {/* Post's content */}
          <Grid item container>
            <Typography
              variant="h5"
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
            <Grid item container rowSpacing={1} columnSpacing={1}>
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
      <ImgViewer
        open={imgOpen}
        img={selectedImg}
        onClose={handleClose}
      />
    </>
  );
}