import { comment } from 'postcss';
import { sleep } from '../utils/sleep';
import {
  static_comments,
  static_post, static_post_2, static_post_3,
} from '../assets/static';

import axios from 'axios';
import { postsApi } from '../assets/my.config';
// 发帖
async function releasePostRequest(
  poster,
  post,
  cid,
  postsfiles
) {
  console.log("postsfiles:", postsfiles);
  const formData = new FormData();
  formData.append('images', postsfiles);
  formData.append('uid', poster.uid);
  formData.append('cid', cid);
  formData.append('content', post.content);

  let response = await axios.post(
    `${postsApi}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  console.log("release Post: ", response);
  if (!response) {
    return { status: 'error', msg: '网络错误', data: {} };
  }
  if (response.status >= 300) {
    return { status: 'error', msg: `${response.status} error`, data: {} };
  }
  let res = response.data;
  if (res.status !== 'success') {
    return { status: 'failed', msg: res.msg, data: {} };
  }
  return { status: 'success', msg: '发布成功', data: {} };
}
async function getCirclePostsRequest(cid) {
  await sleep(1000);
  let posts = [];
  return {
    status: 'success',
    msg: '获取圈子动态成功',
    data: {
      posts: posts
    }
  };
}
async function getPostCommentsRequest(pid) {
  await sleep(1000);
  return {
    status: 'success', msg: '获取评论成功', data: {
      comments: static_comments
    }
  };
}

async function getPostAllCommentsRequest(pid) {
  await sleep(2000);
  return {
    status: 'success', msg: '获取全部评论成功', data: {
      comments: static_comments
    }
  };
}

async function releaseCommentRequest(comment) {
  await sleep(1000);
  let comid = Math.floor(Math.random() * 100000).toString();
  return {
    status: 'success', msg: '评论成功', data: {
      comid: comid
    }
  };
}

async function getUserPostsRequest(uid) {
  await sleep(1000);
  return {
    status: 'success', msg: '获取用户帖子成功', data: {
      posts: [static_post, static_post_2, static_post_3]
    }
  }
}

async function changePostActsRequest(pid, uid, act_type) {
  await sleep(1000);
  return { status: 'success', msg: '操作成功', data: {} };
}

export {
  getCirclePostsRequest,
  releasePostRequest,
  getPostCommentsRequest,
  getUserPostsRequest,
  releaseCommentRequest,
  getPostAllCommentsRequest,
};