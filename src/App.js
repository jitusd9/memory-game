import React from 'react'
import "./App.css"
import Draggable from './components/draggable'

import { 
    icon2,
    icon3,
    icon4,
    icon5,
    icon6,
    icon8,
} from './icons'


export default function App() {

  const [tilesLeft, setTilesLeft] = React.useState(0);

  const [attempts, setAttempts] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [highScore, setHighScore] = React.useState(0);

  const [tilesToMatch, storeTiles] = React.useState([]);

  const [imgGrid, setImgGrid] = React.useState([]);

  const [scorecard, setScorecard] = React.useState(true);

  const [clickable, setClickable] = React.useState(true);


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
    
        setClickable(false);
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
            setClickable(true);
          }else{
            //match succeed
            setScore(score + 100);
            setTilesLeft(tilesLeft - 2);
            tilesToMatch.forEach(tile => {
              tile.dataset.flipped = "done";
              tile.setAttribute("disabled", true)
            });
            storeTiles([]);
            setClickable(true);
            
          }         

        }, 600);
        
      }
    }

  }



  // CREATE GAME GRID
  function randmiseImages(){
    const images = [icon8,icon2,icon3,icon4,icon5,icon6];
    let imgArr = [...images,...images,...images,...images]

    
    for (let i = 0; i < imgArr.length; i++) {
      let randomIndex = Math.floor(Math.random() * imgArr.length);
      let temp = imgArr[randomIndex];
      imgArr[randomIndex] = imgArr[i];
      imgArr[i] = temp; 
    }
    setImgGrid(imgArr);
    setTilesLeft(imgArr.length);
    getScore();
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

  React.useEffect(() => {

    if(score > highScore){
      setHighScore(score);
      localStorage.setItem("score", score);
    }

  },[score])

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
          !scorecard ? <button className='show-btn' onClick={() => setScorecard(true)}>Show Scorecard</button> : ""
        }

        {
          scorecard || tilesLeft === 0 ? 
          <Draggable displayfunc={setScorecard}>
            {
              tilesLeft === 0 ? <h3>Hurray🎉 Game finished 🥳</h3> : ""
            }
            <p>Highest Score : {highScore}</p>
            <p className='score'>Score : <span>{score}</span></p>
            <p className='attempts'>Attempts : <span>{attempts}</span></p>
            <div>
              <button onClick={restartGame}>Restart</button>

            </div>
          </Draggable> : ""
        }

        
        <div className="board">
            {
              imgGrid.map((img,index) => (
                <div className="card" onClick={(e) => { clickable && flipCard(e);}} data-flipped="false" key={index}>
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


