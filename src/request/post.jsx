import { sleep } from '../utils/sleep';
import {
  static_comments,
  static_post, static_post_2, static_post_3,
} from '../assets/static';

import axios from 'axios';
import { postsApi, clientBase, commentsApi } from '../assets/my.config';
// 发帖
async function releasePostRequest(
  poster,
  post,
  cid,
  postsfiles
) {
  console.log("postsfiles:", postsfiles);
  const formData = new FormData();
  for (let i = 0; i < postsfiles.length; i++) {
    formData.append('image', postsfiles[i]);
  }
  formData.append('uid', poster.uid);
  formData.append('cid', cid);
  formData.append('content', post.content);

  let response = await axios.post(
    `${postsApi}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
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
  const { imgs, ...postInfo } = res.data.post;
  return {
    status: 'success', msg: '发布成功', data: {
      post: {
        post:
        {
          ...postInfo,
          imgs: imgs.map(img => `${clientBase}/${img}`),
        },
        poster: poster
      }
    }
  };
}
// 获取圈子动态
async function getCirclePostsRequest(cid) {
  let response = await axios.get(`${postsApi}?cid=${cid}`);
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
  let posts = res.data.posts;
  console.log("posts: ", posts);
  posts = posts.map(post => {
    const poster = post.poster, { imgs, ...postInfo } = post.post;
    return {
      post: {
        ...postInfo,
        imgs: imgs.map(img => `${clientBase}/${img}`),
      },
      poster: {
        ...poster,
        avatarUrl: `${clientBase}/${poster.avatarUrl}`,
      }
    }
  });
  return {
    status: 'success',
    msg: '获取圈子动态成功',
    data: {
      posts: posts
    }
  };
}

// 获取帖子的评论
async function getPostCommentsRequest(pid) {
  let response = await axios.get(`${commentsApi}?pid=${pid}`);
  console.log("getPostCommentsRequest: ", response);
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
  let comments = res.data.comments;
  return {
    status: 'success', msg: '获取最新评论成功', data: {
      comments: comments.map(comment => {
        const commentInfo = comment.comment;
        const commenter = comment.commenter;
        return {
          ...commentInfo,
          commenter: {
            ...commenter,
            avatarUrl: `${clientBase}/${commenter.avatarUrl}`
          }
        };
      })
    }
  };
}

// 获取帖子全部评论
async function getPostAllCommentsRequest(pid) {
  throw new Error('Not implemented yet');
  await sleep(2000);
  return {
    status: 'success', msg: '获取全部评论成功', data: {
      comments: static_comments
    }
  };
}

// 发表评论
async function releaseCommentRequest({ content, pid, commenter }) {
  const { uid } = commenter;
  let response = await axios.post(`${commentsApi}`, {
    commenter_id: uid,
    content: content,
    pid: pid,
  });
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
  let commentInfo = res.data.commentInfo;
  return {
    status: 'success', msg: '评论成功', data: {
      comment: {
        ...commentInfo,
        commenter
      }
    }
  };
}

// 获取用户帖子
async function getUserPostsRequest(uid) {
  throw new Error('Not implemented yet');
  await sleep(1000);
  return {
    status: 'success', msg: '获取用户帖子成功', data: {
      posts: [static_post, static_post_2, static_post_3]
    }
  }
}

// 点赞帖子
async function likePostActRequest(pid, uid, isLike = true) {
  let response = await axios.put(`${postsApi}/like?pid=${pid}&uid=${uid}&type=${isLike ? 'like' : 'unlike'}`);
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
  return { status: 'success', msg: '操作成功', data: {} };
}

export {
  getCirclePostsRequest,
  releasePostRequest,
  getPostCommentsRequest,
  releaseCommentRequest,
  getPostAllCommentsRequest,
  likePostActRequest,
};