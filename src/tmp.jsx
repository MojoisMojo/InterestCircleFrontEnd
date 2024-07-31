import { useState } from 'react'
import reactLogo from '/logo.svg'
import viteLogo from '/logo.svg'
import * as util_request from './request/util.request'

function TmpApp() {
  const [count, setCount] = useState(0)
  const [title, setTitle] = useState("");

  util_request.getTitle().then(result => {
    console.log(title)
    setTitle(result);
  })

  return (
    <>
      <div>
        <img src='http://127.0.0.1:7002/public/img/cat0.png' className="logo" alt="Vite logo" />
        <img src='http://127.0.0.1:7002/public/img/cat1.png' className="logo react" alt="React logo" />
      </div>
      <h1>{title}</h1>
      <div className="card">
        <button onClick={() => {
          let newCount = count + 1;
          setCount(newCount);
          websocket_client.send("Current Count is: " + newCount);
        }}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default TmpApp