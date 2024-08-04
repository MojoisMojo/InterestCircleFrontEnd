import axios from 'axios';
import { clientBase, userApi } from "../assets/my.config";

async function getUserInfoWithUid(uid) {
  try {
    const res = await axios.get(`${userApi}/uid/${uid}`);
    console.log(res);
    if (!res) {
      return { status: 'error', msg: '网络错误', data: {} };
    }
    if (res.status >= 300) {
      return { status: 'error', msg: `${res.status} error`, data: {} };
    }
    const userRes = res.data;
    if (userRes.status !== 'success') {
      return { status: 'failed', msg: userRes.msg, data: {} };
    }
    return {
      status: userRes.status,
      msg: userRes.msg,
      data:
      {
        user: {
          ...userRes.data.user,
          avatarUrl: userRes.data.user ? `${clientBase}/${userRes.data.user.avatarUrl}` : '/logo.svg'
        }
      }
    };

  } catch (e) {
    console.error('There was a problem with getUserInfo', e);
    return { status: 'error', msg: '网络错误', data: {} };
  }
}

async function getUserInfoWithEmail(email) {
  try {
    const res = await axios.get(`${userApi}/email/${email}`);
    if (!res) {
      return { status: 'error', msg: '网络错误', data: {} };
    }
    if (res.status >= 300) {
      return { status: 'error', msg: `${res.status} error`, data: {} };
    }
    const userRes = res.data;
    if (userRes.status !== 'success') {
      return { status: 'failed', msg: userRes.msg, data: {} };
    }
    return {
      status: userRes.status,
      msg: userRes.msg,
      data:
      {
        user: {
          ...userRes.data.user,
          avatarUrl: userRes.data.user ? `${clientBase}/${userRes.data.user.avatarUrl}` : '/logo.svg'
        }
      }
    };

  } catch (e) {
    console.error('There was a problem with getUserInfo', e);
    return { status: 'error', msg: '网络错误', data: {} };
  }
}

async function changeUserInfo({ uid, name = null, avatarfile = null, bio = null }) {
  console.log({ uid, name, avatarfile, bio });
  if (!uid) {
    return { status: 'error', msg: '您未登录', data: {} };
  }
  if (name == null && avatarfile == null && bio == null) {
    return { status: 'failed', msg: '没有需要更新的信息', data: {} };
  }
  const formData = new FormData();
  if (avatarfile != null) {
    formData.append('image', avatarfile);
  }
  formData.append('uid', uid);
  if (name != null) {
    formData.append('name', name);
  }
  if (bio != null) {
    formData.append('bio', bio);
  }
  const response = await axios.put(`${userApi}/uid`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
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
    status: res.status,
    msg: res.msg,
    data: {
      user: {
        ...res.data.user,
        avatarUrl: res.data.user ? `${clientBase}/${res.data.user.avatarUrl}` : '/logo.svg'
      }
    }
  };
}

export { getUserInfoWithUid, getUserInfoWithEmail, changeUserInfo };
