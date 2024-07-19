import React from 'react';
import { useState } from 'react';
import SquareContainer from './components/SquareContainer';
const TmpApp = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <SquareContainer
      >
        <img
          src='/src/assets/img/gameCirclePic.png'
          alt='gameCirclePic'
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </SquareContainer>
    </div>
  );
}

export default TmpApp;

