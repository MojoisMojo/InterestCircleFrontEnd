import React from 'react';
import Box from '@mui/material/Box';

function SquareContainer() {
  return (
    <Box sx={{
      width: '50%',
      paddingTop: '50%', // 使用 paddingTop 来间接设置高度，保持1:1的宽高比
      position: 'relative', // 设置为相对定位，以便内部内容可以绝对定位于此容器中
    }}>
      <Box sx={{
        position: 'absolute', // 绝对定位内部内容
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'primary.main', // 设置背景颜色或其他样式
        display: 'flex', // 使用flex布局
        alignItems: 'center', // 垂直居中
        justifyContent: 'center', // 水平居中
      }}>
        {/* 容器内的内容 */}
        内容
      </Box>
    </Box>
  );
}

export default SquareContainer;