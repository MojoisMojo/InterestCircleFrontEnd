import { static_empty_user } from "../assets/static";
import React from "react";
import Cookie from 'js-cookie';
function email2uid(email) {
  // 删除@和.的内容
  return email.replace(/[@.]/g, '');
}

async function loginRequest(email, password) {
  let uid = email2uid(email);
  console.log('Email:', email, 'Password:', password, "UID:", uid);
  let user = {...static_empty_user};
  user.uid = uid;
  user.email = email;
  // connet to database and login. 
  Cookie.set('uid', uid, { expires: 1 });
  return {status:'success',msg:'登录成功',data:
    {
      user:user
    }
  };
}

async function registerRequest() {

}

async function logoutRequest(){
  Cookie.remove('uid');
  return {status:'success',msg:'登出成功',data:{}};
}

export {
  loginRequest,
  registerRequest,
  logoutRequest
}