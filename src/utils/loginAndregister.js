import { static_empty_user } from "../assets/static";
function email2uid(email) {
  // 删除@和.的内容
  return email.replace(/[@.]/g, '');
}

async function loginRequest(email, password) {
  let uid = email2uid(email);
  console.log('Email:', email, 'Password:', password, "UID:", uid);
  let user = {...static_empty_user};
  user.uid = uid;
  return {status:'success',msg:'登录成功',data:
    {
      user:user
    }
  };
}

async function registerRequest() {

}

export {
  loginRequest,
  registerRequest
}