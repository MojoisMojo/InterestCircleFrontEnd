import { static_empty_user } from "../assets/static";
import React from "react";
import Cookie from 'js-cookie';
import { sleep } from "../utils/sleep";
import { encode, decode } from "../utils/cookie";
import { mEncode, mDecode } from "../utils/password";
import { getUserInfoWithEmail, getUserInfoWithUid } from "./userInfo";

import axios from 'axios';
import { clientBase } from "../assets/my.config";

const userApi = `${clientBase}/users`;

async function loginRequest(email, password) {
  if (!email || !password) {
    return { status: 'failed', msg: '请输入邮箱和密码', data: {} };
  }
  // 密码加密
  password = mEncode(password);
  let res = await axios.post(`${userApi}/login`, { email, password });
  console.log(res);
  if (!res) {
    return { status: 'error', msg: '网络错误', data: {} };
  }
  if (res.status >= 300) {
    return { status: 'error', msg: `${res.status} error`, data: {} };
  }

  let userRes = res.data;
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
        avatarUrl: userRes.data.user ? `${clientBase}${userRes.data.user.avatarUrl}` : '/logo.svg'
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
  let res = await axios.post(`${userApi}/register`, { name, email, password });
  if (!res) {
    return { status: 'error', msg: '网络错误', data: {} };
  }
  if (res.status >= 300) {
    return { status: 'error', msg: `${res.status} error`, data: {} };
  }
  let userRes = res.data;
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
        avatarUrl: userRes.data.user ? `${clientBase}${userRes.data.user.avatarUrl}` : '/logo.svg'
      }
    }
  };
}

async function logoutRequest() {
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