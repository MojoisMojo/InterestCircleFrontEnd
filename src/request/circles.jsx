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
  const res = await axios.post(`${circleApi}`,
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
  const circleRes = res.data;
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
  const response = await axios.get(`${userApi}/cid/${cid}`);
  console.log(response);
  if (!response) {
    return { status: 'error', msg: '网络错误', data: {} };
  }
  if (response.status >= 300) {
    return { status: 'error', msg: `${response.status} error`, data: {} };
  }
  const res = response.data;
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
  const res = await axios.get(`${circleApi}?cid=${cid}&uid=${uid}`);
  console.log(res);
  if (!res) {
    return { status: 'error', msg: '网络错误', data: {} };
  }
  if (res.status >= 300) {
    return { status: 'error', msg: `${res.status} error`, data: {} };
  }
  const circleRes = res.data;
  if (circleRes.status !== 'success') {
    return { status: 'failed', msg: circleRes.msg, data: {} };
  }
  const circle = circleRes.data.circle;
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
  const response = isJoined
    ? await axios.post(`${circleMemberApi}/join`, { cid, uid })
    : await axios.post(`${circleMemberApi}/leave`, { cid, uid });
  console.log(response);
  if (!response) {
    return { status: 'error', msg: '网络错误', data: {} };
  }
  if (response.status >= 300) {
    return { status: 'error', msg: `${response.status} error`, data: {} };
  }
  const res = response.data;
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
  const response = await axios.get(`${circleMemberApi}`, { params: { cid, uid } });
  console.log("isMemberRequest:", response);
  if (!response) {
    return { status: 'error', msg: '网络错误', data: {} };
  }
  if (response.status >= 300) {
    return { status: 'error', msg: `${response.status} error`, data: {} };
  }
  const res = response.data;
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
  const circleRes = response.data;
  if (circleRes.status !== 'success') {
    return { status: 'failed', msg: circleRes.msg, data: {} };
  }
  const circlesList = circleRes.data.circlesList;
  let circlesJoined = {};
  for (const circleInfo of circlesList) {
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
  console.log("getUserAllCirclesRequest: ", response);
  if (!response) {
    return { status: 'error', msg: '网络错误', data: {} };
  }
  if (response.status >= 300) {
    return { status: 'error', msg: `${response.status} error`, data: {} };
  }
  const circleRes = response.data;
  if (circleRes.status !== 'success') {
    return { status: 'failed', msg: circleRes.msg, data: {} };
  }
  const circlesList = circleRes.data.circlesList;
  console.log(circlesList);
  return {
    status: 'success',
    msg: '获取圈子成功',
    data: {
      circles: circlesList.map(circle => {
        return {
          ...circle.circle,
          cicon: `${clientBase}/${circle.circle.cicon}`
        }
      }),
    }
  };
}

export {
  getCircleActiveUsersRequest,
  getUserAllCirclesRequest as getUserAllCirclesRequest,
  getCircleInfoRequest,
  joinOrleaveCircleRequest,
  getInterestCirclesRequest,
  createCircleRequest,
  isMemberRequest,
};
