import { act } from "react";
import Post from "./components/Post/Post";
import { static_post, static_poster } from "./assets/static";

const TmpApp = () => {
  return (
    <div>
      <Post poster={static_poster} post={static_post} />
    </div>
  );
}

export default TmpApp;