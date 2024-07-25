import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ImgViewer from '../Dialog/ImgViewer';
import { Box } from '@mui/material';
import SquareContainer from '../SquareContainer';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ButtonBase from '@mui/material/ButtonBase';



import UserContext from '../../context/UserContext';



import CommentsViewer from './CommentsViewer';
import { formateDateToString } from '../../utils/mTime';

const Img = styled('img')({
  // margin: 'auto',
  // display: 'block',
  // maxWidth: '100%',
  // maxHeight: '100%',
});

const IntShown = (i) => {
  let int = parseInt(i);
  if (!Number.isInteger(int)) {
    return 'NaN';
  }
  if (int < 1e3) { return int.toString(); } // 0~999
  let table = [
    [1e4, 1e3, 1, 'k'],   // 1.0k ~ 9.9k
    [1e6, 1e4, 1, 'w'],   // 1.0w ~ 99.9w
    [1e8, 1e6, 1, 'm'],   // 1.0m ~ 99.9m
    [1e9, 1e6, 0, 'm'],   // 100m ~ 999m
    [1e10, 1e9, 1, 'bn'],  // 1.0b ~ 9.9bn
  ]
  for (let i = 0; i < table.length; i++) {
    if (int < table[i][0]) {
      return (int / table[i][1]).toFixed(table[i][2]) + table[i][3];
    }
  }
  return '10bn+';
}
export default function Post({ poster, post }) {
  const { currUser, setCurrUser } = React.useContext(UserContext);

  const [imgOpen, setImgOpen] = React.useState(false);
  const [selectedImg, setSelectedImg] = React.useState('');

  const [comOpen, setComOpen] = React.useState(false);

  const [likesNum, setlikesNum] = React.useState(post.likes);
  const [looksNum, setlooksNum] = React.useState(post.looks);
  const [comsNum, setcomsNum] = React.useState(post.comments);

  const handleImgOpen = (imgUrl) => {
    setSelectedImg(imgUrl);
    setImgOpen(true);
  };

  const handleImgClose = () => {
    setImgOpen(false);
  };

  const handleComOpen = () => {
    setComOpen(true);
  };

  const handleComClose = () => {
    setComOpen(false);
  }

  const handleAct = (act_type) => {
    // check validness
    if (!currUser.uid) {
      alert('请先登录');
      return;
    }
    switch (act_type) {
      case 'Coms':
        handleComOpen();
        break;
      case 'Looks':
        setlooksNum(looksNum + 1);
        break;
      case 'Likes':
        setlikesNum(likesNum + 1);
        break;
      default:
        console.log('Unknown act_type');
        break;
    }

  };

  const onCommentReleased = () => {
    setcomsNum(comsNum + 1);
  };

  return (
    <>
      <Card
        elevation={3}
        sx={{
          p: 3,
          paddingTop: 2,
          margin: 'auto',
          flexGrow: 0.5,
          backgroundColor: '#fff',
          textAlign: 'left',
          borderRadius: '8px',
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
                borderRadius: '50%',
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
              direction={{ xs: 'column' }}
              spacing={2}
              alignItems='flex-start'
              justifyContent='center'
              paddingTop={{ xs: '10px', sm: '12px' }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  fontSize: {
                    xs: '1.1rem', // 小屏幕
                    sm: '1.15rem', // 小型设备
                    md: '1.2rem', // 中型设备
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
                variant="body2"
                sx={{
                  lineHeight: '1.43',
                  fontSize: {
                    xs: '0.8rem', // 小屏幕
                    sm: '0.85rem', // 小型设备
                    md: '0.875rem'
                  },
                  fontWeight: 400,
                  color: 'rgba(0, 0, 0, 0.6)',
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {formateDateToString(post.time)}
              </Typography>
            </Grid>
          </Grid>
          {/* Post's content */}
          <Grid item container
            sx={{ width: { xs: '100%', sm: '90%', md: '80%' } }}
            paddingTop='8px !important'
          >
            <Typography
              variant="body2"
              component="div"
              sx={{
                width: '100%',
                fontFamily: 'monospace',
                fontSize: {
                  xs: '0.9rem', // 小屏幕
                  sm: '1rem', // 小型设备
                  md: '1.1rem', // 中型设备
                  lg: '1.15rem', // 大型设备
                },
              }}
            >
              {post.content}
            </Typography>
            {/* Post's images */}
            <Grid item container
              rowSpacing={{ xs: 1, md: 1.5 }}
              columnSpacing={{ xs: 1, md: 1.5 }}
              paddingTop='8px !important'
              sx={{ width: '100%' }}
            >
              {post.imgs.map((img) => (
                <Grid item
                  xs={6}
                  sm={4}
                >
                  <SquareContainer
                    item
                    key={post.pid + img.id}
                  >
                    <ButtonBase
                      sx={{
                        width: '100%',
                        height: '100%',
                        borderRadius: { xs: '5px', sm: '10px' },
                      }}
                      onClick={() => handleImgOpen(img)}
                    >
                      <img
                        src={img}
                        alt="img"
                        style={{ borderRadius: 'inherit', objectFit: 'cover', width: '100%', height: '100%' }}
                      />
                    </ButtonBase>
                  </SquareContainer>
                </Grid>
              ))}
            </Grid>
          </Grid>
          {/* Acted info of the post */}
          <Grid item container
            direction="row"
            spacing={0.5}
            sx={{ height: '60px' }}
            justifyContent='center'
          >
            {[
              { name: 'Likes', value: likesNum },
              { name: 'Looks', value: looksNum },
              { name: 'Coms', value: comsNum },
            ].map((info, index) => (
              <Grid container item xs={4} key={info.name} sx={{ height: '100%' }}>
                <ButtonBase
                  sx={{
                    height: '100%', width: '100%',
                    justifyContent: 'center'
                  }}
                  onClick={(e) => { handleAct(info.name) }}
                >
                  <Typography>
                    {info.name}: {IntShown(info.value)}
                  </Typography>
                </ButtonBase>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Card>
      <ImgViewer
        open={imgOpen}
        img={selectedImg}
        onClose={handleImgClose}
      />
      <CommentsViewer
        open={comOpen}
        pid={post.pid}
        onClose={handleComClose}
        onCommentReleased={onCommentReleased}
      >
      </CommentsViewer>
    </>
  );
}