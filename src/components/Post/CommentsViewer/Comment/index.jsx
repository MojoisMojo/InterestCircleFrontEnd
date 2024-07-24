import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';

function Comment({ comment }) {
  let commenter = comment.commenter;
  return (
    <Box
      sx={{
        p: 2,
        paddingTop: 1,
        margin: 'auto',
        flexGrow: 0.5,
        backgroundColor: '#fff',
        textAlign: 'left',
      }}
    >
      <Grid container
        direction="column"
        spacing={2}
        alignItems='center'
      >
        {/* commenter info & comment's time */}
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
              <Avatar alt="Avatar" src={commenter.avatarUrl}
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
              {commenter.name}
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
              {comment.time}
            </Typography>
          </Grid>
        </Grid>
        {/* comment's content */}
        <Grid item container
          sx={{ width: '100%' }}
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
            {comment.content}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

function CommentsLayout({ comments }) {
  return (
    <div style={{
      width: '100%', height: '80%', margin: 'auto'
    }}>
      {comments.map(comment => (
        <div
          style={{ margin: '10px' }}
          key={comment.comid}
        >
          <Comment comment={comment} />
        </div>
      ))}
    </div>
  );
}

export { Comment, CommentsLayout };