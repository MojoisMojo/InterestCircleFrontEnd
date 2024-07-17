import React from 'react';
import { useState } from 'react';
import Viewer from 'react-viewer';
const TmpApp = () => {
  const [ visible, setVisible ] = useState(false);

  return (
    <div>
      <button onClick={() => { setVisible(true); } }>{"show"}</button>
      <Viewer
      visible={visible}
      onClose={() => { setVisible(false); } }
      images={[{src: "/logo.svg", alt: "logo"}]}
      />
    </div>
  );
}

export default TmpApp;

