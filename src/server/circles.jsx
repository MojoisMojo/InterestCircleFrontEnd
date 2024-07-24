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

async function getCircleActiveUsersRequest(cid) {
  await sleep(1000);
  let users = [
    {
      name: '张三',
      avatarUrl: '/logo.svg',
      bio: '这是张三',
    },
    {
      name: '李四',
      avatarUrl: '/logo.svg',
      bio: '这是李四',
    },
    {
      name: '王五',
      avatarUrl: '/logo.svg',
      bio: '这是王五',
    },
  ];
  return {
    status: 'success',
    msg: '获取圈子活跃用户成功',
    data: {
      users: users
    }
  };
}

export { getCirclePostsRequest, getCircleActiveUsersRequest };
