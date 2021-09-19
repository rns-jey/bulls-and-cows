import React, { useState } from 'react';
import './App.css';

function App() {
  const numbers = [0,1,2,3,4,5,6,7,8,9];
  const [code, generateCode] = useState("");
  const [guess, guessWhat] = useState([0,1,2,3]);
  const [message, giveMsg] = useState("");
  
  function startGame() {
    let secretCode = "";
    let numArr = numbers;

    while (secretCode.length < 4) {
      let randNum = Math.floor(Math.random() * numArr.length)

      secretCode += numArr.splice(randNum,1).toString();
    }
    
    generateCode(prevCode => secretCode);
  }

  function otherNumbers(pos,i) {
    let digit = parseInt(guess[i])
    switch (pos) {
      case "top":
        return (digit === 0) ? 9 : (digit - 1);
      case "bot":
        return (digit === 9) ? 0 : (digit + 1);
    }
  }

  function handleClick(e) {
    if (message !== "You Lose!") {
      const { id } = e.target
      let newArr = [...guess]
      let pos = [...id]
      let i = pos.pop();

      pos = pos.join("")

      switch (pos) {
        case "top":
          newArr[i] = (newArr[i] === 9) ? 0 : (newArr[i] + 1);
          break;
        default:
          newArr[i] = (newArr[i] === 0) ? 9 : (newArr[i] - 1);
          break;
      }
      
      guessWhat(prevGuess => newArr);
    }
  }

  function isMatched(a,b) {
    return (a === b)
  }

  function handleSubmit() {
    let arrCode = [...code]
    let arrGuess = [...guess]
    let bulls = 0
    let cows = 0

    for (let i = 0; i < 4; i++) {
      bulls = isMatched(arrCode[i],arrGuess[i].toString()) === true ? bulls + 1 : bulls;
      cows = arrCode.includes(arrGuess[i].toString()) === true ? cows + 1 : cows;
    }
  }

  return (
    <div className="Main">
      <div>
        <div className="container">
          <div className="tile top1" id="top0" onClick={handleClick}>{otherNumbers("top",0)}</div>
          <div className="tile top2" id="top1" onClick={handleClick}>{otherNumbers("top",1)}</div>
          <div className="tile top3" id="top2" onClick={handleClick}>{otherNumbers("top",2)}</div>
          <div className="tile top4" id="top3" onClick={handleClick}>{otherNumbers("top",3)}</div>
          <div className="tile num1">{guess[0]}</div>
          <div className="tile num2">{guess[1]}</div>
          <div className="tile num3">{guess[2]}</div>
          <div className="tile num4">{guess[3]}</div>
          <div className="tile bot1" id="bot0" onClick={handleClick}>{otherNumbers("bot",0)}</div>
          <div className="tile bot2" id="bot1" onClick={handleClick}>{otherNumbers("bot",1)}</div>
          <div className="tile bot3" id="bot2" onClick={handleClick}>{otherNumbers("bot",2)}</div>
          <div className="tile bot4" id="bot3" onClick={handleClick}>{otherNumbers("bot",3)}</div>
        </div>
        <button onClick={startGame}>Game Start!</button>
        <button onClick={handleSubmit}>Get Combination!</button>
      </div>
    </div>
  );
}

export default App;
