import React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
const FlexImg = styled('img')({
  margin: 'auto',
  padding: 'auto',
});
export default function ImgViewer({ open, img, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        alignItems: 'center',     // 垂直居中
        justifyContent: 'center', // 水平居中
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
  );
}