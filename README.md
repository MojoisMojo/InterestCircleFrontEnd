# 兴趣圈项目前端

- [仓库链接](https://github.com/MojoisMojo/InterestCircleFrontEnd)

## 环境

Windows 11, Intel i7, 内存 16GB；

### npm & node 版本

npm ：10.7.0
node：v20.15.0

## 打包流程

1. 执行`npm install`安装依赖
2. 执行`npm run build`将源文件打包到 dist 文件夹
3. 将 dist, package.json 打包即可。

## 部署和启用流程

1. 在项目根目录执行`npm install`安装依赖
2. 执行`npm run serve`启动服务。

## 技术栈

### Vite + React

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### UI 组件

主要使用了 [MUI5](https://mui.com/material-ui/all-components/)

Header 组件使用了 [TailWind](https://tailwindcss.com/)

## 代码细节

### 后端信息传递的结构

```js
status：'success' or 'failed' or 'error'
所有需要传递或显示的信息放在 msg 里面
所有需要传递的内容放在 data 里面
```

## TODO

### 前端 关于 WaterFallFlow 的布局 (未实现)

https://juejin.cn/post/7270160291411886132

https://juejin.cn/post/7322655035699396660

### Input 的 限制问题

中文 2 字符 英文 1 字符
