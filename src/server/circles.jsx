import { sleep } from "../utils/sleep";
import { static_circle_posts } from "../assets/static";
async function getCirclePostsRequest(cid) {
  await sleep(1000);
  let posts = static_circle_posts;
  return {
    status: 'success',
    msg: '获取圈子动态成功',
    data: {
      posts: posts
    }
  };
}

export { getCirclePostsRequest };
