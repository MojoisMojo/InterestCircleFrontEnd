import { sleep } from "../utils/sleep";
import { static_empty_user } from "../assets/static";
async function getUserInfoWithUid(uid) {
  /// TODO: connect to database and get user info with uid
  //let user = dbClient.getUserInfoWithUid(uid);
  //模拟等待请求
  await sleep(1000);
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

export { getUserInfoWithUid, getUserInfoWithEmail };
