import * as React from 'react';
import { Button, TextField, Box, IconButton } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
export default function PostSender(props) {
  const [postContent, setPostContent] = React.useState('');
  const [selectedCircle, setSelectedCircle] = React.useState(null);
  const [image, setImage] = React.useState(null);

  // destructure the props
  let { circles, onSubmit, _ } = props;

  // format the data for the Autocomplete component
  let topics = circles.map(circle => { return { 'label': circle.cname }; });

  console.log(topics);

  const handlePostChange = (event) => {
    setPostContent(event.target.value);
  };

  const handleCircleChange = (_, newValue) => {
    setSelectedCircle(newValue);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handlePostSubmit = () => {
    if (onSubmit) {
      onSubmit({ postContent, cid: selectedCircle.cid, image });
      setPostContent('');
      setSelectedCircle(null);
      setImage(null);
    }
  };

  return (
    <Box
      p={1}
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1 },
        '& .MuiButton-root': { m: 1 },
        fontSize: '0.5rem !important',
      }}

      noValidate
      autoComplete="off"
    >
      <Autocomplete
        options={circles}
        getOptionLabel={(option) => option.cname}
        onChange={handleCircleChange}
        renderInput={(params) =>
          <TextField
            sx={{ fontSize: '0.5rem !important' }}
            {...params} label="选择话题"
          />
        }
        disablePortal
        sx={{ width: '25%', maxWidth: '200px', }}
      />
      <TextField
        label="有什么想和大家分享的？"
        multiline
        minRows={2}
        maxRows={8}
        value={postContent}
        onChange={handlePostChange}
        variant="outlined"
        fullWidth
      />
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={handleImageChange}
      />
      <label htmlFor="raised-button-file">
        <IconButton component="span">
          <PhotoCamera />
        </IconButton>
      </label>
      <Button onClick={handlePostSubmit} variant="contained" color="primary">
        发帖
      </Button>
    </Box>
  );
}