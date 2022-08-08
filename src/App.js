import React from 'react'
import "./App.css"
import Draggable from './components/draggable'

import { 
    icon1,
    icon2,
    icon3,
    icon4,
    icon5,
    icon6,
    icon7,
    icon8,
    icon9,
    icon10,
    icon11,
    icon12
} from './icons'


export default function App() {

  const [tilesLeft, setTilesLeft] = React.useState(0);
  const [falsey, setFalsy] = React.useState(false);

  const [attempts, setAttempts] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [highScore, setHighScore] = React.useState(0);

  const [tilesToMatch, storeTiles] = React.useState([]);

  const [imgGrid, setImgGrid] = React.useState([]);

  const [displayScore, setDisplayScore] = React.useState(true);

  const [reload, setReload] = React.useState(false);


  function matchTiles(tiles){
    let ImgSrc1 = tiles[0].querySelector('img');
    let ImgSrc2 = tiles[1].querySelector('img');
    const img1 = ImgSrc1.src.replace(/^.*[\\/]/, '');
    const img2 = ImgSrc2.src.replace(/^.*[\\/]/, '');
    return img1 === img2 ? true : false;
  }

  function flipCard(e){

    let tile = e.target;
    tile.dataset.flipped = "true";
    tile.setAttribute("disabled", true);
    
    if(tilesToMatch.length < 2){
      tilesToMatch.push(tile);

      if(tilesToMatch.length === 2){
        setAttempts(attempts + 1);
        let matchResult = matchTiles(tilesToMatch);

        setTimeout(() => {
          if(!matchResult){
            // match failed
            score <= 0 ? setScore(0) : setScore(score - 20);
            tilesToMatch.forEach(tile => {
              tile.dataset.flipped = "false";
              tile.setAttribute("disabled", false)
            });
            storeTiles([]);
          }else{
            //match succeed
            setScore(score + 100);
            setTilesLeft(tilesLeft - 2);
            tilesToMatch.forEach(tile => {
              tile.dataset.flipped = "done";
              tile.setAttribute("disabled", true)
            });
            storeTiles([]);
          }

          if(score > highScore){
            setHighScore(score);
            localStorage.setItem("score", score);
          }

        }, 800);
        
      }
    }

  }

  // CREATE GAME GRID
  function randmiseImages(){
    let imgArr = [icon1,icon2,icon3,icon4,icon5,icon6,icon7,icon8,icon9,icon1,icon2,icon3,icon4,icon5,icon6,icon7,icon8,icon9,icon1,icon2,icon3,icon4,icon5,icon6,icon7,icon8,icon9,icon1,icon2,icon3,icon4,icon5,icon6,icon7,icon8,icon9]
    for (let i = 0; i < 36; i++) {
      let randomIndex = Math.floor(Math.random() * 36);
      let temp = imgArr[randomIndex];
      imgArr[randomIndex] = imgArr[i];
      imgArr[i] = temp; 
    }
    setImgGrid(imgArr);
    setTilesLeft(imgArr.length);
    getScore();
  }


  function quickCheat(){
    score === 0 ? setScore(0) : setScore(score - 50);
    setFalsy(true);
    setTimeout(() => {
      setFalsy(false);
    }, 1000);
  }

  function getScore(){
    let hScore = localStorage.getItem("score");
    setHighScore(hScore);
  }

  function restartGame(){
    window.location.reload();
  }

  React.useEffect(() => {
    
    randmiseImages();

  },[])

  return (
      <div className="game">
        <div className="title">
          {
            "MEMORY GAME".split("").map((letter , index)=> (
                <div className='box card' key={index}>
                  <div className="card-inner">
                    <div className="front"></div>
                    <div className="back">
                      {letter}
                    </div>
                  </div>
                </div>
              ))
          }
        </div>

        {
          /*button hides when scoreboard displays*/
          !displayScore ? <button className='show-btn' onClick={() => setDisplayScore(true)}>Show Scorecard</button> : ""
        }

        {
          displayScore ? 
          <Draggable displayfunc={setDisplayScore} moveX={4} moveY={3}>
            {
              tilesLeft === 0 ? <h3>Hurray🎉 Game finished 🥳</h3> : ""
            }
            <p>Highest Score : {highScore}</p>
            <p className='score'>Score : <span>{score}</span></p>
            <p className='attempts'>Attempts : <span>{attempts}</span></p>
            <div>
              <button onClick={restartGame}>Restart</button>
              <button onClick={quickCheat}>Cheat</button>
            </div>
          </Draggable> : ""
        }

        
        <div className="board">
            {
              imgGrid.map((img,index) => (
                <div className="card" onClick={(e) => {flipCard(e);}} data-flipped={falsey} key={index}>
                  <div className="card-inner">
                    <div className="front"></div>
                    <div className="back">
                      <img src={img} alt="icon" />
                    </div>
                  </div>
                </div>
              ))
            }
        </div>

        <div className='attribution'>
          <p>
            <a target="_blank" rel='noreferrer' href="https://free3dicon.com">🔥 icons from free3dicon.com &#8599;</a>
          </p>
        </div>

      </div>
  )
}


