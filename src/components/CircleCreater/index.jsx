import React from 'react';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import { Paper } from '@mui/material';

function CircleCreater(props) {

  const { currUser, setCurrUser } = useContext(UserContext);
  const [circleName, setCircleName] = React.useState('');
  const [circleDescription, setCircleDescription] = React.useState('');
  const [circleIcon, setCircleIcon] = React.useState('');

  const handleCircleNameChange = (event) => {
    setCircleName(event.target.value);
  };

  const handleCircleDescriptionChange = (event) => {
    setCircleDescription(event.target.value);
  };
  const handleCircleIconChange = (event) => {
    setCircleIcon(event.target.value);
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
      });
  };

  return (
    <Paper
      p={3}
      elevation={3}
      component='form'
      sx={{ width: '100%' }}
    >
      <TextField
        label="兴趣圈名"
        multiline
        minRows={1}
        maxRows={1}
        value={postContent}
        onChange={handlePostChange}
        variant="outlined"
        sx={{
          width: '30%',
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
            padding: '8px', // 设置你想要的内边距
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

    </Paper>
  );

}

export default CircleCreater;