import * as React from 'react';
import { Button, TextField, Box, IconButton, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import AutorenewIcon from '@mui/icons-material/Autorenew';

import SquareContainer from '../../SquareContainer';
import ImgViewer from '../../Dialog/ImgViewer';
import UserContext from '../../../context/UserContext';

import { releasePostRequest } from '../../../server/post';

export default function PostSender(props) {

  let { circles, circle, _ } = props;
  // 只用到了 cid, cname

  const { currUser, setCurrUser } = React.useContext(UserContext);

  const [postContent, setPostContent] = React.useState('');
  const [selectedCircle, setSelectedCircle] = React.useState(null);
  const [postImgs, setPostImgs] = React.useState([]);

  const [imgOpen, setImgOpen] = React.useState(false);
  const [selectedImg, setSelectedImg] = React.useState('');
  const handleClickOpenImg = (imgUrl) => {
    setSelectedImg(imgUrl);
    setImgOpen(true);
  };

  const handleClose = () => {
    setImgOpen(false);
  };

  const handlePostChange = (event) => {
    setPostContent(event.target.value);
  };

  const handleCircleChange = (_, newValue) => {
    setSelectedCircle(newValue);
  };

  const handleImageChange = (event) => {
    // console.log(event.target.files);
    // 忽略

    // 过滤掉非图片文件
    let files = Array.from(event.target.files).filter((file) => file.type.startsWith('image/'));
    // 限制上传图片数量
    if (postImgs.length + files.length > 9) {
      alert('最多一共只能上传9张图片! ');
      return;
    }
    // 限制上传图片大小
    for (let file of files) {
      if (file.size > 5 * 1024 * 1024) {
        alert('单张图片大小不能超过5MB!');
        return;
      }
    }
    // 上传图片
    Promise.all(files.map(file => {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    })).then(images => {
      // images 是所有文件读取操作完成后的结果数组
      setPostImgs(postImgs.concat(images));
    }).catch(error => {
      console.error("Error reading files:", error);
    });
  };

  const handlePostSubmit = () => {

    // 检查合法性
    if (!selectedCircle) {
      alert('请选择一个圈子!');
      return;
    }
    if (!postContent) {
      alert('请输入帖子内容!');
      return;
    }
    if (!currUser.uid) {
      alert('请先登录!');
      return;
    }
    let poster = { uid: currUser.uid, uname: currUser.uname, avatarUrl: currUser.avatarUrl };
    let post = { content: postContent, imgs: postImgs };
    let cid = selectedCircle.cid;
    releasePostRequest(
      { poster, post, cid }
    ).then(res => {
      if (res.status !== 'success') {
        alert(res.msg);
        return;
      }
      alert('发帖成功!');
      setPostContent('');
      setSelectedCircle(null);
      setPostImgs([]);
    });
  };

  return (
    <Paper
      elevation={3}
      component="form"
      sx={{
        p: 1,
        '& .MuiTextField-root': { m: 1 },
        '& .MuiButton-root': { m: 1 },
        height: 'fit-content',
        width: '100%',
      }}
      noValidate
      autoComplete="off"
      alignItems='center'
      justifyContent='center'
    >
      <Autocomplete
        options={circles}
        noOptionsText='请先加入圈子'
        getOptionLabel={(option) => { return option ? option.cname : '' }}
        onChange={handleCircleChange}
        value={selectedCircle}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <Box
              key={key}
              component='li'
              sx={{ 
                fontSize: '0.8rem',
              }}
              {...optionProps}
            >
              {option.cname}
            </Box>
          );
        }}
        renderInput={(params) =>
          <TextField
            {...params}
            label="选择发帖圈子"
            size='small'
            InputLabelProps={{
              sx: {
                fontSize: '0.8rem', // 更改 label 的字体大小
              },
            }}
          />
        }
        size='small'
        disablePortal
        sx={{
          width: '40%',
          maxWidth: '200px',
          minWidth: '100px',
          '& .MuiAutocomplete-inputRoot': {
            fontSize: '0.8rem !important', // 更改字体大小
          },
          '& .MuiAutocomplete-option': {
            fontSize: '0.8rem !important', // 更改选项的字体大小
          },
          '& fieldset': {
            border: 'none', // 移除边框
          },
          '&:hover fieldset': {
            border: 'none', // 鼠标悬停时也不显示边框
          },
          '&.Mui-focused fieldset': {
            border: 'none', // 聚焦时也不显示边框
          },
        }}
      />
      <TextField
        label="有什么想和大家分享的？"
        multiline
        minRows={2}
        maxRows={8}
        value={postContent}
        onChange={handlePostChange}
        variant="outlined"
        sx={{
          width: 'calc(100% - 16px)',
          '& .MuiOutlinedInput-root': {
            padding: '8px', 
            '& fieldset': {
              border: 'none', // 移除边框
            },
            '&:hover fieldset': {
              border: 'none', // 鼠标悬停时也不显示边框
            },
            '&.Mui-focused fieldset': {
              border: 'none', // 聚焦时也不显示边框
            },
          },
        }}
        InputLabelProps={{
          sx: {
            fontSize: '0.9rem', // 更改 label 的字体大小
          },
        }}
      />
      {/* Post's images */}
      <Grid item sx={{ width: 'calc(95% - 16px)', margin: 'auto', }}>
        <Grid item container
          rowSpacing={{ xs: 1, md: 1.5 }}
          columnSpacing={{ xs: 1, md: 1.5 }}
          paddingTop='8px !important'
          sx={{ width: '100%' }}
        >
          {postImgs.map((imgfile, index) => (
            <Grid item
              xs={6}
              sm={4}
              md={3}
              lg={2.4}
            >
              <SquareContainer
                item
                key={index}
              >
                <ButtonBase
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: { xs: '5px', sm: '10px' },
                  }}
                  onClick={() => handleClickOpenImg(imgfile)}
                >
                  <img
                    src={imgfile}
                    alt="img"
                    loading='lazy'
                    style={{ borderRadius: 'inherit', objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </ButtonBase>
              </SquareContainer>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={handleImageChange}
        disabled={postImgs.length >= 9}
      />
      {/* Post's images Icon And Post Button */}
      <Box
        display='flex'
        justifyContent='flex-end'
        alignItems='center'
      >
        <label htmlFor="raised-button-file">
          <IconButton component="span">
            <PhotoCamera />
          </IconButton>
        </label>
        <IconButton onClick={(e) => { e.stopPropagation(); setPostImgs([]) }}>
          <RefreshIcon />
        </IconButton>
        <Button
          onClick={handlePostSubmit}
          variant="contained"
          color="primary"
          disabled={postContent.length === 0 || !selectedCircle}
        >
          发帖
        </Button>
      </Box>
      <ImgViewer
        open={imgOpen}
        img={selectedImg}
        onClose={handleClose}
      />
    </Paper>
  );
}