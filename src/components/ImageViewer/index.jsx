import React from 'react';
import Dialog from '@mui/material/Dialog';

const FullImg = styled('img')({
  margin: 'auto',
  display: 'flex',
});

function ImageDialog({ selectedImg}) {
  let {imgUrl,imgWidth,imgHeight} = selectedImg;
  // 直接根据已知的图片宽高计算宽高比
  const aspectRatio = imgWidth / imgHeight;

  // 计算对话框的样式
  const dialogStyle = {
    width: `calc(100vh * ${aspectRatio}px)`, // 根据宽高比调整宽度
    maxWidth: '100vw', // 确保不超过视口宽度
    height: '100vh', // 高度设置为视口高度
    margin: '0 auto', // 水平居中
  };

  return (
    <Dialog
      open={true}
      PaperProps={{
        style: dialogStyle,
      }}
    >
      <FullImg
        alt="img"
        src={imgUrl}
        sx={{
          objectFit: 'contain',
          maxHeight: '100vh',
          maxWidth: '100%',
          overflow: 'clip',
          padding: 0,
          margin: 0,
        }}
      />
    </Dialog>
  );
}

export default ImageDialog;