import { act } from "react";
import Post from "./components/Post/Post";
import CircleCard from "./components/CircleCard/CircleCard";
import { static_post, static_poster, static_circle_card_info_daily, static_circle_card_info_game } from "./assets/static";

const TmpApp = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <CircleCard circle={static_circle_card_info_daily} cardWidth={240} />
      <CircleCard circle={static_circle_card_info_game} cardWidth={240} />
    </div>
  );
}

export default TmpApp;