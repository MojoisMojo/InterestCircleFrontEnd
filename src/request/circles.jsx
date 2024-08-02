import { sleep } from "../utils/sleep";
import { static_circle_card_info_daily, static_circle_info, static_circle_posts, static_circles, static_circles_joined } from "../assets/static";

import { clientBase, userApi, circleApi } from '../assets/my.config';
import axios from "axios";
// 获取活跃用户
async function getCircleActiveUsersRequest(cid) {
  let res = await axios.get(`${userApi}/cid/${cid}`);
  if (!res) {
    return { status: 'error', msg: '网络错误', data: {} };
  }
  if (res.status >= 300) {
    return { status: 'error', msg: `${res.status} error`, data: {} };
  }
  let userRes = res.data;
  if (userRes.status !== 'success') {
    return { status: 'failed', msg: userRes.msg, data: {} };
  }
  return {
    status: 'success',
    msg: userRes.msg,
    data: {
      users: userRes.users
    }
  };
}
// 获取cid的圈子的信息
async function getCircleInfoRequest(cid, uid) {
  let res = await axios.get(`${circleApi}?cid=${cid}&uid=${uid}`);
  console.log(res);
  if (!res) {
    return { status: 'error', msg: '网络错误', data: {} };
  }
  if (res.status >= 300) {
    return { status: 'error', msg: `${res.status} error`, data: {} };
  }
  let circleRes = res.data;
  if (circleRes.status !== 'success') {
    return { status: 'failed', msg: circleRes.msg, data: {} };
  }
  let circle = circleRes.data;
  return {
    status: 'success',
    msg: '获取圈子信息成功',
    data: circle
  };
}

// TODO: 离开或进入圈子
async function joinOrleaveCircleRequest(cid, uid, isJoined) {
  await sleep(1000);
  return {
    status: 'success',
    msg: '加入/退出圈子成功',
    data: { isJoined: !!isJoined },
  };
}

// 获取感兴趣的圈子
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
// 获得自己的圈子
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
// 创建圈子
async function createCircleRequest(uid, cname, cdesc, cfile) {
  console.log('createCircleRequest:', uid, cname, cdesc, cfile);

  const formData = new FormData();
  formData.append('image', cfile);
  formData.append('ccreator_id', uid);
  formData.append('cname', cname);
  formData.append('cdesc', cdesc);
  formData.append('cicon', cfile.name);
  let res = await axios.post(`${circleApi}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
  console.log(res);
  if (!res) {
    return { status: 'error', msg: '网络错误', data: {} };
  }
  if (res.status >= 300) {
    return { status: 'error', msg: `${res.status} error`, data: {} };
  }
  let circleRes = res.data;
  if (circleRes.status !== 'success') {
    return { status: 'failed', msg: circleRes.msg, data: {} };
  }
  return {
    status: 'success',
    msg: '创建圈子成功',
  };
}
// // 上传图片测试
// async function testUploadCircleIconRequest(file) {
//   const formData = new FormData();
//   formData.append('image', file);
//   formData.append('image', file);
//   formData.append('cname', '游戏');

//   let res = await axios.post('http://127.0.0.1:7002/api/upload',
//     formData,
//     {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     }
//   )

//   return {
//     status: 'success',
//     msg: '上传图片成功',
//     data: res.data
//   };
// }

export {
  getCircleActiveUsersRequest,
  getAllCirclesRequest,
  getCircleInfoRequest,
  joinOrleaveCircleRequest,
  getInterestCirclesRequest,
  createCircleRequest,
};
