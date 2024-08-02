import { sleep } from "../utils/sleep";
import {
  static_circles_info,
  static_empty_user, static_mojo_user
} from "../assets/static";
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
    let userRes = res.data;
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
    let userRes = res.data;
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



export { getUserInfoWithUid, getUserInfoWithEmail };
