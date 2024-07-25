import { sleep } from "../utils/sleep";
import {
  static_circles_info,
  static_empty_user, static_mojo_user
} from "../assets/static";

async function getUserInfoWithUid(uid) {
  /// TODO: connect to database and get user info with uid
  //let user = dbClient.getUserInfoWithUid(uid);
  //模拟等待请求
  await sleep(1000);
  let user = { ...static_mojo_user }
  return {
    status: 'success', msg: '登录成功', data:
    {
      user: user
    }
  }
}

async function getUserInfoWithEmail(email) {
  /// TODO: connect to database and get user info with uid
  //let user = dbClient.getUserInfoWithUid(uid);
  //模拟等待请求
  await sleep(1500);
  let user = { ...static_mojo_user };
  return {
    status: 'success', msg: '登录成功', data:
    {
      user: user
    }
  }
}

async function getAllCirclesRequest(uid) {
  // const response = await fetch(`https://myapi.com/circles`);
  // return response.data;
  await sleep(1000);
  return {
    status: 'success',
    msg: '获取圈子成功',
    data: {
      circles: [...static_circles_info]
    }
  };
}

export { getUserInfoWithUid, getUserInfoWithEmail, getAllCirclesRequest };
