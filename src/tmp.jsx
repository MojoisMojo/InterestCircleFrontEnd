import { act } from "react";
import Post from "./components/Post/Post";
import CircleCard from "./components/CircleCard/CircleCard";
import { static_post, static_poster, static_circle_card_info_daily, static_circle_card_info_game } from "./assets/static";
import TransverseCircleCard from "./components/CircleCard/TransverseCircleCard";
const TmpApp = () => {
  return (
    <div style={{width:'300px', display: 'inline', justifyContent: 'center', alignItems: 'center'}}>
      <TransverseCircleCard circle={static_circle_card_info_daily} cardHeight={150} />
      <TransverseCircleCard circle={static_circle_card_info_game} cardHeight={200} />
      <TransverseCircleCard circle={static_circle_card_info_game} cardHeight={250} />
    </div>
  );
}

export default TmpApp;