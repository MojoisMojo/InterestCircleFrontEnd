import { parsePath, useNavigate } from 'react-router-dom'
import CirclePage from '../CirclePage'
import CircleCard from '../../components/CircleCard/CircleCard'
import { static_circle_card_info } from '../../assets/static';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';

function FindCirclesPage() {
  // Assuming you have an array of circle data
  const navigate = useNavigate();
  const circles = [
    static_circle_card_info,
    static_circle_card_info,
    static_circle_card_info
  ];
  const { currUser, setCurrUser } = useContext(UserContext);
  const onJoinOrLeaveCircle = (cId, isJoined) => {

  };
  const onEnterCircle = (cId) => {
    navigate(`/circle?id=${cId}`);
  };
  return (
    <>
      {circles.map(circle => (
        <CircleCard key={circle.id} circle={circle} onEnterCircle={onEnterCircle} onJoinOrLeaveCircle={onJoinOrLeaveCircle} />
      ))}
    </>
  )
}

export default FindCirclesPage
