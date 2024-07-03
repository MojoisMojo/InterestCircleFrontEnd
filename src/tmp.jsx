import { act } from "react";
import Post from "./components/Post/Post";
const static_poster = {
  id: '123',
  name: 'Mojo',
  email: 'mojo@example.com',
  avatarUrl: '/logo.svg',
}
const static_post = {
  time: '2021-09-01',
  content: 'This is a post content',
  img: '/logo.svg',
  actinfo:{
    watches: 10,
    stars: 20,
    likes: 30
  }
}

const TmpApp = () => {
  return (
    <div>
      <Post poster={static_poster} post={static_post} />
    </div>
  );
}

export default TmpApp;