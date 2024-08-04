import React, { useContext, useEffect, useState } from 'react';
import { Container, TextField, Button, Avatar, Typography, Box, Grid, ButtonBase } from '@mui/material';
import UserContext from '../../context/UserContext';
import ImgViewer from '../../components/Dialog/ImgViewer';
import { changeUserInfo } from '../../request/userInfo';

export default function MySettingsPage() {
  const { currUser, setCurrUser } = useContext(UserContext);
  const [newName, setNewName] = useState(currUser.name);
  const [avatarUrl, setAvatarUrl] = useState(currUser.avatarUrl);
  const [imgOpen, setImgOpen] = useState(false);
  const [bio, setBio] = useState(currUser.bio);
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    if (!currUser.uid) { return; }
    setNewName(currUser.name);
    setAvatarUrl(currUser.avatarUrl);
    setBio(currUser.bio);
  }, [currUser.uid])
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarUrl(URL.createObjectURL(file));
    }
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newName.length < 1 || newName.length > 7) {
      alert('昵称长度必须在1到7个字之间');
      return;
    }
    if (bio.length > 50) {
      alert('签名长度必须小于50个字');
      return;
    }
    // 处理表单提交逻辑
    if (!avatarFile && newName === currUser.name && bio === currUser.bio) {
      alert('无需更新');
      return;
    }
    changeUserInfo(
      {
        uid: currUser.uid,
        name: newName === currUser.name ? null : newName,
        avatarfile: avatarFile,
        bio: bio === currUser.bio ? null : bio
      }
    ).then(res => {
      if (res.status !== 'success') {
        alert(res.msg);
        return;
      }
      setCurrUser({
        ...res.data.user
      });
      console.log(res.data.user);
      alert('更新成功');
    })
  };

  return (
    <Container maxWidth="md">
      <Grid container item
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent='flex-start'
        marginTop={2}
        width='95%'
        minHeight='calc(100vh - 64px)'
      >
        <Typography item variant="h4" component="h1" gutterBottom sx={{ width: '100%' }}>
          个人信息
        </Typography>
        <Box item component="form" onSubmit={()=>{}} noValidate sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label={"用户昵称" + (newName ? `${newName.length}/7` : '')}
            name="name"
            value={newName}
            onChange={handleNameChange}
            helperText="昵称长度必须在1到7个字之间"
            inputProps={{
              maxLength: 7, // 限制最大输入字符数为 7
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Avatar
              component={'button'}
              type='button'
              src={avatarUrl} sx={{ width: 56, height: 56, mr: 2 }}
              onClick={() => setImgOpen(true)}
            />
            <Button variant="contained" component="label">
              上传头像
              <input type="file" hidden accept="image/*" onChange={handleAvatarChange} />
            </Button>
          </Box>
          <TextField
            margin="normal"
            fullWidth
            id="bio"
            label={"用户签名" + (bio ? `${bio.length}/50` : '')}
            name="bio"
            value={bio}
            onChange={handleBioChange}
            helperText="签名长度必须在0到50个字之间"
            multiline
            rows={6}
            inputProps={{
              maxLength: 50, // 限制最大输入字符数为 50
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={
              handleSubmit
            }
          >
            保存更改
          </Button>
        </Box>
      </Grid>
      <ImgViewer
        open={imgOpen}
        img={avatarUrl}
        onClose={() => setImgOpen(false)}
      />
    </Container>
  );
}