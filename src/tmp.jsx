import React from 'react';
import UserInfoCard from './components/UserInfoCard';

const TmpApp = () => {
  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <UserInfoCard
        id={1}
        name="Alice"
        avatar="https://i.pravatar.cc/300"
        circleCount={3}
        likeCount={10}
      />
    </div>
  );
}


export default TmpApp;

