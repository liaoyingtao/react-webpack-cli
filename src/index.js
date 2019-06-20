import React from 'react';
import ReactDOM from 'react-dom';
import './style.less';

function App() {
  return (
    <div>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);