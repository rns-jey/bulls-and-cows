import React, { useState } from 'react';
import './App.css';

function App() {
  const numbers = [0,1,2,3,4,5,6,7,8,9];
  const [code, generateCode] = useState("");
  const [guess, guessWhat] = useState([0,1,2,3]);

  function startGame() {
    let secretCode = "";
    let numArr = numbers;

    while (secretCode.length < 4) {
      let randNum = Math.floor(Math.random() * numArr.length)

      secretCode += numArr.splice(randNum,1).toString();
    }
    
    generateCode(prevCode => secretCode);
  }

  return (
    <div className="Main">
      <div>
        <div className="container">
          <div className="tile top1"></div>
          <div className="tile top2"></div>
          <div className="tile top3"></div>
          <div className="tile top4"></div>
          <div className="tile num1">{guess[0]}</div>
          <div className="tile num2">{guess[1]}</div>
          <div className="tile num3">{guess[2]}</div>
          <div className="tile num4">{guess[3]}</div>
          <div className="tile bot1"></div>
          <div className="tile bot2"></div>
          <div className="tile bot3"></div>
          <div className="tile bot4"></div>
        </div>
        <button onClick={startGame}>Game Start!</button>
      </div>
    </div>
  );
}

export default App;
