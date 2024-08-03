import { sleep } from "../utils/sleep";
import {
  static_circle_card_info_daily,
  static_circle_info,
  static_circle_posts,
  static_circles,
  static_circles_info,
  static_circles_joined
} from "../assets/static";

import { clientBase, userApi, circleApi, circleMemberApi } from '../assets/my.config';
import axios from "axios";

// 创建圈子
async function createCircleRequest(uid, cname, cdesc, cfile) {
  console.log("file: ", cfile);
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
// 获取活跃用户
async function getCircleActiveUsersRequest(cid) {
  if (!cid) {
    return { status: 'failed', msg: '缺少圈子信息', data: {} };
  }
  let response = await axios.get(`${userApi}/cid/${cid}`);
  console.log(response);
  if (!response) {
    return { status: 'error', msg: '网络错误', data: {} };
  }
  if (response.status >= 300) {
    return { status: 'error', msg: `${response.status} error`, data: {} };
  }
  let res = response.data;
  if (res.status !== 'success') {
    return { status: 'failed', msg: res.msg, data: {} };
  }
  return {
    status: 'success',
    msg: res.msg,
    data: {
      users:
        res.data.users.map(user => {
          return {
            ...user,
            avatarUrl: `${clientBase}/${user.avatarUrl}`
          }
        })
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
  let circle = circleRes.data.circle;
  return {
    status: 'success',
    msg: '获取圈子信息成功',
    data: {
      circle: {
        ...circle,
        cicon: `${clientBase}/${circle.cicon}`
      },
      isJoined: circleRes.data.isJoined
    }
  };
}

// 离开或进入圈子
async function joinOrleaveCircleRequest(cid, uid, isJoined) {
  // isJoined: true表示需要加入圈子，false表示需要退出圈子
  let response = isJoined
    ? await axios.post(`${circleMemberApi}/join`, { cid, uid })
    : await axios.post(`${circleMemberApi}/leave`, { cid, uid });
  console.log(response);
  if (!response) {
    return { status: 'error', msg: '网络错误', data: {} };
  }
  if (response.status >= 300) {
    return { status: 'error', msg: `${response.status} error`, data: {} };
  }
  let res = response.data;
  if (res.status !== 'success') {
    return { status: 'failed', msg: res.msg, data: {} };
  }
  return {
    status: 'success',
    msg: '加入/退出圈子成功',
    data: {
      ...res.data,
      isJoined: !!isJoined
    },
  };
}

// 查看是否是成员
async function isMemberRequest(cid, uid) {
  let response = await axios.get(`${circleMemberApi}`, { params: { cid, uid } });
  console.log("isMemberRequest:", response);
  if (!response) {
    return { status: 'error', msg: '网络错误', data: {} };
  }
  if (response.status >= 300) {
    return { status: 'error', msg: `${response.status} error`, data: {} };
  }
  let res = response.data;
  if (res.status !== 'success') {
    return { status: 'failed', msg: res.msg, data: {} };
  }
  return {
    status: 'success',
    msg: '获取圈子成员成功',
    data: {
      isJoined: res.data.isMember
    }
  };
}

// 获取感兴趣的圈子
async function getInterestCirclesRequest(uid) {
  if (!uid) {
    uid = '';
  }
  const response = await axios.get(`${circleApi}/recommendation?uid=${uid}`);
  console.log(response);
  if (!response) {
    return { status: 'error', msg: '网络错误', data: {} };
  }
  if (response.status >= 300) {
    return { status: 'error', msg: `${response.status} error`, data: {} };
  }
  let circleRes = response.data;
  if (circleRes.status !== 'success') {
    return { status: 'failed', msg: circleRes.msg, data: {} };
  }
  const circlesList = circleRes.data.circlesList;
  let circlesJoined = {};
  for (let circleInfo of circlesList) {
    let circle = circleInfo.circle;
    circlesJoined[circle.cid] = circleInfo.isJoined;
  }
  return {
    status: 'success',
    msg: '获取兴趣圈子成功',
    data: {
      circles: circlesList.map(circle => {
        return {
          ...circle.circle,
          cicon: `${clientBase}/${circle.circle.cicon}`
        }
      }),
      circlesJoined: circlesJoined,
    }
  }
}
// 获得自己的圈子
async function getUserAllCirclesRequest(uid) {
  if (!uid) {
    return { status: 'failed', msg: '缺少用户信息', data: {} };
  }
  const response = await axios.get(`${circleApi}/mine?uid=${uid}`);
  if (!response) {
    return { status: 'error', msg: '网络错误', data: {} };
  }
  if (response.status >= 300) {
    return { status: 'error', msg: `${response.status} error`, data: {} };
  }
  let circleRes = response.data;
  if (circleRes.status !== 'success') {
    return { status: 'failed', msg: circleRes.msg, data: {} };
  }
  const circlesList = circleRes.data.circlesList;
  return {
    status: 'success',
    msg: '获取圈子成功',
    data: {
      circles: circlesList.map(circle => {
        return {
          ...circle.circleInfo,
          cicon: `${clientBase}/${circle.circleInfo.cicon}`
        }
      }),
    }
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
  getUserAllCirclesRequest as getUserAllCirclesRequest,
  getCircleInfoRequest,
  joinOrleaveCircleRequest,
  getInterestCirclesRequest,
  createCircleRequest,
  isMemberRequest,
};
