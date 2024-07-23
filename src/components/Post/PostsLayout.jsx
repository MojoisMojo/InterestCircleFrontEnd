import Post from "./Post";
export default function PostsLayout({ posts }) {
  console.log(posts);
  return (
    <div >
      {posts.map(post => (
        <div style={{ marginTop: '15px', marginBottom: '10px' }} key={post.post.id}>
          <Post poster={post.poster} post={post.post} />
        </div>
      ))}
    </div>
  )
}