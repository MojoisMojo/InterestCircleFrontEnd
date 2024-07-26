import React from 'react';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import { Grid, Paper } from '@mui/material';
import TextField from '@mui/material/TextField';
import { createCircleRequest } from '../../server/circles';
import { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import ImgViewer from '../Dialog/ImgViewer';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import RefreshIcon from '@mui/icons-material/Refresh';


function CircleCreater(props) {


  const { onCreate, } = props;

  const { currUser, setCurrUser } = useContext(UserContext);
  const [circleName, setCircleName] = React.useState('');
  const [circleDescription, setCircleDescription] = React.useState('');
  const [circleIcon, setCircleIcon] = React.useState('');
  const [iconOpen, setIconOpen] = React.useState(false);
  const [inputFocus, setInputFocus] = React.useState('');

  const handleCircleNameChange = (event) => {
    setCircleName(event.target.value);
  };

  const handleCircleDescriptionChange = (event) => {
    setCircleDescription(event.target.value);
  };
  const handleCircleIconChange = (event) => {
    // 过滤掉非图片文件
    let files = Array.from(event.target.files).filter((file) => file.type.startsWith('image/'));
    // 限制上传图片数量
    if (files.length > 1) {
      alert('只能上传1张图片作为图标!');
      return;
    }
    if (files.length === 0) {
      return;
    }
    let file = files[0];
    // 限制上传图片大小
    if (file.size > 5 * 1024 * 1024) {
      alert('图片大小不能超过5MB!');
      return;
    }
    // 读取文件为 DataURL
    const readFileAsDataURL = (file) => {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };
    // 上传图片
    const uploadImage = async (file) => {
      try {
        const image = await readFileAsDataURL(file);
        setCircleIcon(image);
      } catch (error) {
        console.error("Error reading file:", error);
      }
    };
    uploadImage(file);
  };


  const handleIconOpen = () => {
    setIconOpen(true);
  };
  const handleIconClose = () => {
    setIconOpen(false);
  };

  const handleCreateCircle = () => {
    if (!circleName) {
      alert('圈子名不能为空!');
      return;
    }
    if (!circleDescription) {
      alert('圈子描述不能为空!');
      return;
    }
    if (!circleIcon) {
      alert('圈子图标不能为空!');
      return;
    }
    // 创建圈子
    createCircleRequest(currUser.uid, circleName, circleDescription, circleIcon, new Date().getTime())
      .then((res) => {
        if (res.status !== 'success') {
          alert(res.msg);
          return;
        }
        // 创建成功
        alert('创建成功!');
        setCircleName('');
        setCircleDescription('');
        setCircleIcon('');
        if (onCreate) { onCreate(); }
      });
  };

  return (
    <Paper
      elevation={3}
      component='form'
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
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <TextField
          id='circleName'
          type='text'
          label={(inputFocus === 'circleName') ? `字符数: ${circleName.length}/7` : "兴趣圈名"}
          multiline={false}
          rows={1}
          value={circleName}
          onChange={handleCircleNameChange}
          onFocus={() => { setInputFocus('circleName') }} // 添加onFocus事件处理函数
          onBlur={() => { setInputFocus('') }} // 添加onBlur事件处理函数
          variant="outlined"
          size='small'
          inputProps={{
            maxLength: 7 // 限制最大输入字符数为 7
          }}
          sx={{
            width: '40%',
            maxWidth: '200px',
            minWidth: '100px',
            '& .MuiOutlinedInput-root': {
              padding: '4px',
            },
          }}
          InputLabelProps={{
            sx: {
              fontSize: '0.9rem', // 更改 label 的字体大小
            },
          }}
        />
      </div>
      <TextField
        id='circleDescription'
        type='text'
        label={(inputFocus === 'circleDescription') ? `字符数: ${circleDescription.length}/50` : "描述一下兴趣圈"}
        multiline
        minRows={2}
        maxRows={4}
        value={circleDescription}
        onChange={handleCircleDescriptionChange}
        onFocus={() => { setInputFocus('circleDescription') }} // 添加onFocus事件处理函数
        onBlur={() => { setInputFocus() }} // 添加onBlur事件处理函数
        variant="outlined"
        inputProps={{
          maxLength: 50 // 限制最大输入字符数为 50
        }}
        sx={{
          width: 'calc(100% - 16px)',
          '& .MuiOutlinedInput-root': {
            padding: '16px', // 设置你想要的内边距
          },
        }}
        InputLabelProps={{
          sx: {
            fontSize: '0.9rem', // 更改 label 的字体大小
          },
        }}
      />
      <Grid
        width='100%'
        maxWidth='100%'
        justifyContent={{ xs: 'flex-start', sm: 'space-between' }}
        alignItems={{ xs: 'stretch', sm: 'flex-start' }}
        display='flex'
        direction={{ xs: 'column', sm: 'row' }}
      >
        {/* circle Icon */}
        <div style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}>
          {(circleIcon
            ?
            <ButtonBase sx={{
              width: '100px', height: '100px',
              borderRadius: '10px',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}

              onClick={handleIconOpen}
            >
              <img
                src={circleIcon}
                alt="Circle Icon"
                style={{
                  borderRadius: '10px',
                  width: "100px", height: "100px",
                  objectFit: "cover",
                }}
              />
            </ButtonBase>
            :

            <label htmlFor="raised-button-file"
              style={{
                marginLeft: '8px',
                width: '100%', height: '76px',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <ButtonBase
                component="span"
                style={{
                  width: '100%', height: '76px',
                  borderRadius: '10px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  color: 'gray',
                }}
              >
                添加兴趣圈图标
              </ButtonBase>
            </label>
          )}
        </div>
        {/*phone images Icon And Create Button */}
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={handleCircleIconChange}
        />
        <Box
          display='flex'
          sx={{ flexDirection: 'row' }}
          justifyContent='flex-end'
          alignItems='center'
        >
          <label htmlFor="raised-button-file">
            <IconButton component="span">
              <PhotoCamera />
            </IconButton>
          </label>
          <IconButton onClick={(e) => { e.stopPropagation(); setCircleIcon('') }}>
            <RefreshIcon />
          </IconButton>
          <Button
            onClick={handleCreateCircle}
            variant="contained"
            color="primary"
            disabled={circleName.length === 0 || circleDescription.length === 0 || circleIcon.length === 0}
          >
            创建圈子
          </Button>
        </Box>
      </Grid>

      <ImgViewer
        open={iconOpen}
        img={circleIcon}
        onClose={handleIconClose}
      />
    </Paper >
  );

}

export default CircleCreater;