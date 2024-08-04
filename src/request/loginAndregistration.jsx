import Cookie from 'js-cookie';
import { encode, } from "../utils/cookie";
import { mEncode, } from "../utils/password";
import { getUserInfoWithEmail, getUserInfoWithUid } from "./userInfo";

import axios from 'axios';
import { clientBase, userApi } from "../assets/my.config";


async function loginRequest(email, password) {
  if (!email || !password) {
    return { status: 'failed', msg: '请输入邮箱和密码', data: {} };
  }
  // 密码加密
  password = mEncode(password);
  const res = await axios.post(`${userApi}/login`, { email, password });
  console.log(res);
  if (!res) {
    return { status: 'error', msg: '网络错误', data: {} };
  }
  if (res.status >= 300) {
    return { status: 'error', msg: `${res.status} error`, data: {} };
  }

  const userRes = res.data;
  if (userRes.status === 'success') {
    Cookie.set('uid', encode(userRes.data.user.uid), { expires: 1 });
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
}

async function registerRequest(name, email, password) {
  if (!name || !email || !password) {
    return { status: 'failed', msg: '请输入邮箱和密码', data: {} };
  }
  // 密码加密
  password = mEncode(password);
  const res = await axios.post(`${userApi}/register`, { name, email, password });
  if (!res) {
    return { status: 'error', msg: '网络错误', data: {} };
  }
  if (res.status >= 300) {
    return { status: 'error', msg: `${res.status} error`, data: {} };
  }
  const userRes = res.data;
  if (userRes.status === 'success') {
    Cookie.set('uid', encode(userRes.data.user.uid), { expires: 1 });
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
}

function logoutRequest() {
  Cookie.remove('uid');
  return { status: 'success', msg: '登出成功', data: {} };
}

export {
  getUserInfoWithUid,
  getUserInfoWithEmail,
  loginRequest,
  registerRequest,
  logoutRequest
}