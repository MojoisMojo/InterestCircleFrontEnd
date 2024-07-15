import { static_empty_user } from "../assets/static";
import React from "react";
import Cookie from 'js-cookie';
async function getUserInfoWithUid(uid) {
  /// TODO: connect to database and get user info with uid
  //let user = dbClient.getUserInfoWithUid(uid);
  let user = { ...static_empty_user };
  user.uid = uid;
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
  if(userRes.status == 'success'){
    Cookie.set('uid', uid, { expires: 1 });
    console.log('Cookie:', Cookie.get('uid'));
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