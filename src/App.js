import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import './style.less';
import { Button } from 'antd';

function App() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <Button onClick={() => setCount(count + 1)}>
        Click me
      </Button>
    </div>
  );
}

export default hot(App);