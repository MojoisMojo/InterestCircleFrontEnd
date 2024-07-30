import { sleep } from "../utils/sleep";
import { static_circle_card_info_daily, static_circle_info, static_circle_posts, static_circles, static_circles_joined } from "../assets/static";
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
      uid: 'uid1',
      name: '张三',
      avatarUrl: '/logo.svg',
      bio: '这是张三',
    },
    {
      uid: 'uid2',
      name: '李四',
      avatarUrl: '/logo.svg',
      bio: '这是李四',
    },
    {
      uid: 'uid3',
      name: '王五',
      avatarUrl: '/logo.svg',
      bio: '这是王五',
    },
    {
      uid: 'uid4',
      name: '赵六',
      avatarUrl: '/logo.svg',
      bio: '这是赵六',
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

async function getCircleInfoRequest(cid, uid) {
  await sleep(1000);
  let circle = { ...static_circle_info };
  return {
    status: 'success',
    msg: '获取圈子信息成功',
    data: {
      circle: circle,
      isJoined: true,
    }
  };
}

async function joinOrleaveCircleRequest(cid, uid, isJoined) {
  await sleep(1000);
  return {
    status: 'success',
    msg: '加入/退出圈子成功',
    data: { isJoined: !!isJoined },
  };
}

async function getInterestCirclesRequest(uid) {
  await sleep(1000);
  return {
    status: 'success',
    msg: '获取兴趣圈子成功',
    data: {
      circles: static_circles,
      circlesJoined: static_circles_joined,
    }
  }
}

async function createCircleRequest(uid, cname, cdesc, cicon, ctime) {
  await sleep(1000);
  return {
    status: 'success',
    msg: '创建圈子成功',
  };
}

export {
  getCirclePostsRequest,
  getCircleActiveUsersRequest,
  getCircleInfoRequest,
  joinOrleaveCircleRequest,
  getInterestCirclesRequest,
  createCircleRequest,
};
