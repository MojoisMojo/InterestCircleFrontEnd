import React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const FlexImg = styled('img')({
  margin: 'auto',
  padding: 'auto',
});
export default function ImgViewer({ open, img, onClose }) {
  return (
    <div>
      <IconButton
        sx={{
          display: open ? 'flex' : 'none',
          position: 'fixed',
          top: 8,
          left: 8,
          zIndex: 1500,
          backgroundColor: 'darkgrey',
          '&:hover': {
            backgroundColor: 'rgba(206, 204, 204, 0.8)',
          },
        }}
        aria-label="close"
        size="small"
        onClick={onClose}
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
      <Dialog
        open={open}
        onClose={onClose}
        sx={{
          alignItems: 'center',     // 垂直居中
          justifyContent: 'center', // 水平居中
          width: '100vw',
          height: '100vh',
        }}
      >
        <FlexImg
          alt="img"
          src={img}
          sx={{
            objectFit: 'contain',
            maxHeight: 'calc(100vh - 64px)', // 不要动它！至少不要改得比他大！
            width: 'auto',
          }}
        />
      </Dialog>
    </div>
  );
}