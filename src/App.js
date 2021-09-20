import React, { useState } from 'react';
import './App.css';

function App() {
  const numbers = [0,1,2,3,4,5,6,7,8,9];
  const [code, generateCode] = useState("");
  const [guess, guessWhat] = useState([0,1,2,3]);
  const [message, giveMsg] = useState("");
  const [clsDigit1, depress1] = useState("lockDigitContainer");
  const [clsDigit2, depress2] = useState("lockDigitContainer");
  const [clsDigit3, depress3] = useState("lockDigitContainer");
  const [clsDigit4, depress4] = useState("lockDigitContainer");
  
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

  function wheelPressed (e) {
    const { className } = e.target

    switch (className) {
      case "lockDigit lockDigitPrev":
        depress1(prevCls => "lockDigitContainer depressed");
        break;
      default:
        depress1(prevCls => "lockDigitContainer depressed");
        break;
    }
  }

  function wheelMoved (e) {
    const { id, className } = e.target

    switch (className) {
      case "lockDigit lockDigitPrev":
        setDigit("top",0)
        depress1(prevCls => "lockDigitContainer");
        break;
      default:
        setDigit("bot",0)
        depress1(prevCls => "lockDigitContainer");
        break;
    }
  }

  function isMatched(a,b) {
    return (a === b)
  }

  function duplicates() {
    let arrGuess = [...guess]

    if (arrGuess[0] === arrGuess[1] || arrGuess[0] === arrGuess[2] || arrGuess[0] === arrGuess[3]) {
      return "duplicates!"
    }

    if (arrGuess[1] === arrGuess[2] || arrGuess[1] === arrGuess[3]) {
      return "duplicates!"
    }

    if (arrGuess[2] === arrGuess[3]) {
      return "Duplicates!"
    }

    return "";
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

    if (duplicates().length > 0) {
      giveMsg(prevMsg => "Duplicates!")
      return;
    }

    if (bulls === 4) {
      giveMsg(prevMsg => "You win!!!!!!!!")
    } else {
      giveMsg(prevMsg => "Bulls: " + bulls + ", Cows: " + (cows - bulls))
    }
  }

  function newGame() {
    startGame()
    guessWhat(prevGuess => [0,1,2,3]);
    giveMsg(prevMsg => "")
  }

  function giveUp() {
    let arrCode = [...code]

    if (arrCode.length > 0) {
      guessWhat(prevGuess => [...code]);
      giveMsg(prevMsg => "You Lose!")
    }
  }

  return (
    <div className="Main">
      <div>
      <div className="lockContainer">
        <div className={clsDigit1} id="digit0">
          <div className="lockDigit lockDigitPrev" onMouseDown={wheelPressed}>{otherNumbers("top",0)}</div>
          <div className="lockDigit lockDigitCur">{guess[0]}</div>
          <div className="lockDigit lockDigitNext">{otherNumbers("bot",0)}</div>
        </div>
        <div className={clsDigit2} id="digit1">
          <div className="lockDigit lockDigitPrev">{otherNumbers("top",1)}</div>
          <div className="lockDigit lockDigitCur">{guess[1]}</div>
          <div className="lockDigit lockDigitNext">{otherNumbers("bot",1)}</div>
        </div>
        <div className={clsDigit3} id="digit2">
          <div className="lockDigit lockDigitPrev">{otherNumbers("top",2)}</div>
          <div className="lockDigit lockDigitCur">{guess[2]}</div>
          <div className="lockDigit lockDigitNext">{otherNumbers("bot",2)}</div>
        </div>
        <div className={clsDigit4} id="digit3">
          <div className="lockDigit lockDigitPrev">{otherNumbers("top",3)}</div>
          <div className="lockDigit lockDigitCur">{guess[3]}</div>
          <div className="lockDigit lockDigitNext">{otherNumbers("bot",3)}</div>
        </div>
      </div>
      <div className="btnContainer">
        <button id="getBtn">🔒</button>
      </div>
        <button onClick={startGame}>Game Start!</button>
        <button onClick={newGame}>New Game!</button>
        <button onClick={handleSubmit}>Get Combination!</button>
        <button onClick={giveUp}>Give Up?</button>
      </div>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
