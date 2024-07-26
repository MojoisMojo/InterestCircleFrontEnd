import Post from "./Post";
export default function PostsLayout({ posts }) {
  return (
    <div
      style={{
        maxWidth: '100%',
        width: '100%',
      }}
    >
      {posts.map(post => (
        <div
          style={{
            maxWidth: '100%',
            width: '100%',
            marginTop: '15px', marginBottom: '10px'
          }}
          key={post.post.pid}>
          <Post poster={post.poster} post={post.post} />
        </div>
      ))}
    </div>
  )
}