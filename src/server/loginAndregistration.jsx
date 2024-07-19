import { static_empty_user } from "../assets/static";
import React from "react";
import Cookie from 'js-cookie';
import { sleep } from "../utils/sleep";
import { encode, decode } from "../utils/cookie";
async function getUserInfoWithUid(uid) {
  /// TODO: connect to database and get user info with uid
  //let user = dbClient.getUserInfoWithUid(uid);
  //模拟等待请求
  await sleep(1500);
  let user = { ...static_empty_user };
  user.uid = uid;
  user.name = "mojo";
  user.email = "221900175@smail.nju.edu.cn";
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
  let user = { ...static_empty_user };
  user.uid = "221900175smailnjueducn";
  user.name = "mojo";
  user.email = email;
  return {
    status: 'success', msg: '登录成功', data:
    {
      user: user
    }
  }
}

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

async function registerRequest(email, password) {
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