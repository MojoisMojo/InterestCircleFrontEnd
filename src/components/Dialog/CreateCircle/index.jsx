import { useRef, useState, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import UserContext from '/src/context/UserContext.jsx';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { Typography } from '@mui/material';

export default function CreateCircle({ open, pid, onClose, onCircleCreated }) {
  const { currUser, setCurrUser } = useContext(UserContext);

  const descriptionElementRef = useRef(null);
  const handleSubmit = () => {
  };

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog
        maxWidth='lg'
        open={open}
        fullWidth
        onClose={onClose}
        scroll='paper'
        aria-labelledby={pid}
        aria-describedby={pid}
      >
        <DialogTitle id="scroll-dialog-title"
        >
          <Typography variant='h5' fontWeight='bold'>
            Comments
          </Typography>
          <IconButton
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 1,
              backgroundColor: 'rgba(206, 204, 204, 0.6)',
              '&:hover': {
                backgroundColor: 'darkgrey',
              },
            }}
            aria-label="close"
            size="small"
            onClick={onClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers={true} sx={{
          p: 0,
        }}>
          <CommentsLayout comments={comments} />
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="评论"
            type="text"
            fullWidth
            variant="outlined"
            value={myCommentContent}
            onChange={(e) => setMyCommentContent(e.target.value)}
            sx={{ width: 'calc(100% - 100px)' }}
          />
          <Button onClick={handleSubmit} sx={{
            height: 56,
            width: 80,
            fontSize: '1.2rem',
            letterSpacing: '0.1rem !important',
          }}>
            评论
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}