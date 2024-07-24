// import Post from "../../components/Post/Post";
// import { useEffect, useState } from "react";
// import {static_poster,static_post,static_circle_posts} from "../../assets/static";

// async function fetchPosts(circleId) {
//   // const response = await fetch(`https://myapi.com/circles/posts/?id=${circleId}`);
//   // return response.data;
//   return static_circle_posts;
// }

// const CirclePage = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     // 使用URLSearchParams解析当前URL中的查询参数
//     const queryParams = new URLSearchParams(window.location.search);
//     const circleId = queryParams.get('id'); // 假设URL是这样的: /circle/?id=123

//     if (circleId) {
//       fetchPosts(circleId).then(data => {
//         setPosts(data); // 假设返回的数据是帖子数组
//       });
//     }
//   }, []); // 空依赖数组意味着这个effect只在组件挂载时运行一次

//   return (
//     <div >
//       {posts.map(post => (
//         <div style={{marginTop:'15px', marginBottom: '10px' }} key={post.post.id}>
//         <Post poster={post.poster} post={post.post}/> 
//         </div>
//       ))}
//     </div>
//   )
// }

// export default CirclePage;