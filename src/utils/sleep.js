// 定义sleep函数
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export { sleep };