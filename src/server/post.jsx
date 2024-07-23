import { sleep } from '../utils/sleep';
// 在
async function releasePostRequest(poster, post, cid){
  await sleep(1000);
  return {status: 'success', msg: '发布成功', data: {}};
}




async function getUserPostsRequest(uid) {}

export { releasePostRequest };