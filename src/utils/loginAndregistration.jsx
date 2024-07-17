import { static_empty_user } from "../assets/static";
import React from "react";
import Cookie from 'js-cookie';
import { sleep } from "./sleep";
import { encode,decode } from "./cookie";
async function getUserInfoWithUid(uid) {
  /// TODO: connect to database and get user info with uid
  //let user = dbClient.getUserInfoWithUid(uid);
  //模拟等待请求
  await sleep(1500);
  let user = {...static_empty_user};
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

function email2uid(email) {
  // 删除@和.的内容
  return email.replace(/[@.]/g, '');
}

async function loginRequest(email, password) {
  let uid = email2uid(email);
  console.log('Email:', email, 'Password:', password, "UID:", uid);
  let userRes = await getUserInfoWithUid(uid);
  if (userRes.status == 'success') {
    Cookie.set('uid', encode(uid), { expires: 1 });
  }
  return {
    status: userRes.status, msg: userRes.msg, data:
    {
      user: userRes.data.user
    }
  };
}

async function registerRequest() {

}

async function logoutRequest() {
  Cookie.remove('uid');
  return { status: 'success', msg: '登出成功', data: {} };
}

export {
  loginRequest,
  registerRequest,
  logoutRequest,
  getUserInfoWithUid,
}