import { static_empty_user } from "../assets/static";
import React from "react";
import Cookie from 'js-cookie';
import { sleep } from "../utils/sleep";
import { encode, decode } from "../utils/cookie";
import { getUserInfoWithEmail, getUserInfoWithUid } from "./userInfo";

async function loginRequest(email, password) {
  // let userRes = dbclient.loginRequest(email, password);
  let userRes = await getUserInfoWithEmail(email);
  if (userRes.status == 'success') {
    Cookie.set('uid', encode(userRes.data.user.uid), { expires: 1 });
  }
  return {
    status: userRes.status, msg: userRes.msg, data:
    {
      user: userRes.data.user
    }
  };
}

async function registerRequest(name, email, password) {
  // let userRes = dbclient.registerRequest(email, password);
  let userRes = await getUserInfoWithEmail(email);
  if (userRes.status == 'success') {
    Cookie.set('uid', encode(userRes.data.user.uid), { expires: 1 });
  }
  return {
    status: userRes.status, msg: userRes.msg, data:
    {
      user: userRes.data.user
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