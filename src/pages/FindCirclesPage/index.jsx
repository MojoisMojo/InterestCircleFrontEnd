import { parsePath, useNavigate } from 'react-router-dom'
import CirclePage from '../CirclePage'
import CircleCard from '../../components/CircleCard/CircleCard'
import { static_circle_card_info_daily } from '../../assets/static';
import { useContext,useState } from 'react';
import UserContext from '../../context/UserContext';
import { sleep } from '../../utils/sleep';
function FindCirclesPage() {
  // Assuming you have an array of circle data
  const navigate = useNavigate();
  const circles = [
    static_circle_card_info_daily,
    static_circle_card_info_daily,
    static_circle_card_info_daily
  ];
  const { currUser, setCurrUser } = useContext(UserContext);
  const {columnNum, setColumnNum} = useState(3);
  async function onJoinOrLeaveCircle(cId, isJoined) {

  };
  async function onEnterCircle(cId) {
    navigate(`/circle?id=${cId}`);
  };

  return (
    <>
      {circles.map(circle => (
        <CircleCard 
          key={circle.id} 
          circle={circle} 
          cardWidth={"30%"}
          onEnterCircle={onEnterCircle} 
          onJoinOrLeaveCircle={onJoinOrLeaveCircle} />
      ))}
    </>
  )
}

export default FindCirclesPage
