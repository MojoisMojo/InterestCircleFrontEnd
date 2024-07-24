import React, { useContext } from 'react';
import UserInfoCard from './components/UserInfoCard';
import CommentsViewer from './components/Post/CommentsViewer';
import { static_comments, static_mojo_user } from './assets/static';
import { Button } from '@mui/material';
import UserContext from './context/UserContext';

const TmpApp = () => {
  const { currUser, setCurrUser } = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  setCurrUser(static_mojo_user);

  return (
    <div>
      <Button onClick={handleOpen}>paper</Button>
      <CommentsViewer open={open} pid='123' onClose={handleClose} />
    </div>
  );
}


export default TmpApp;

