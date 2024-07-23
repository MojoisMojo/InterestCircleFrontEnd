import * as React from 'react';
import { Button, TextField, Box, IconButton, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import ButtonBase from '@mui/material/ButtonBase';

import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import AutorenewIcon from '@mui/icons-material/Autorenew';

import SquareContainer from '../../SquareContainer';
import ImgViewer from '../../ImgViewer';

export default function PostSender(props) {
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

  // destructure the props
  let { circles, onSubmit, _ } = props;

  const handlePostChange = (event) => {
    setPostContent(event.target.value);
  };

  const handleCircleChange = (_, newValue) => {
    setSelectedCircle(newValue);
  };

  const handleImageChange = (event) => {
    console.log(event.target.files);
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
    if (onSubmit) {
      onSubmit({ postContent, cid: selectedCircle.cid, postImgs });
    }
    setPostContent('');
    setSelectedCircle(null);
    setPostImgs([]);
  };

  return (
    <Box
      p={1}
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1 },
        '& .MuiButton-root': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <Autocomplete
        options={circles}
        getOptionLabel={(option) => { return option.cname }}
        onChange={handleCircleChange}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <Typography variant='h6' sx={{lineHeight:'2rem', textAlign:'center', fontSize: '0.9rem' }}>
              {option.cname}
            </Typography>
          );
        }}
        renderInput={(params) =>
          <TextField
            {...params} label="选择话题"
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
          width: '25%',
          maxWidth: '200px',
          minWidth: '100px',
          '& .MuiAutocomplete-inputRoot': {
            fontSize: '0.8rem !important', // 更改字体大小
          },
          '& .MuiAutocomplete-option': {
            fontSize: '0.8rem !important', // 更改选项的字体大小
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
          width: 'calc(100% - 16px)'
        }}
        InputLabelProps={{
          sx: {
            fontSize: '0.9rem', // 更改 label 的字体大小
          },
        }}
      />
      {/* Post's images */}
      <Grid item container
        rowSpacing={{ xs: 1, md: 1.5 }}
        columnSpacing={{ xs: 1, md: 1.5 }}
        paddingTop='8px !important'
        sx={{ width: 'calc(100% - 16px)' }}
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
      {/* Post's images Icon And Post Button */}
      <Box display='flex' justifyContent='flex-end' alignItems='center'>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={handleImageChange}
          disabled={postImgs.length >= 9}
        />
        <label htmlFor="raised-button-file">
          <IconButton component="span">
            <PhotoCamera />
          </IconButton>
        </label>
        <IconButton>
          <RefreshIcon onClick={(e) => { e.stopPropagation(); setPostImgs([]) }} />
        </IconButton>
        <Button onClick={handlePostSubmit} variant="contained" color="primary">
          发帖
        </Button>
      </Box>
      <ImgViewer
        open={imgOpen}
        img={selectedImg}
        onClose={handleClose}
      />
    </Box>
  );
}