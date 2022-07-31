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

  const [imgArr, setImgArr] = React.useState([
    icon1,icon2,icon3,icon4,icon5,icon6,icon7,icon8,icon9
  ])

  const [tilesLeft, setTilesLeft] = React.useState(0);

  const [attempts, setAttempts] = React.useState(0);
  const [score, setScore] = React.useState(0);

  const [tilesToMatch, storeTiles] = React.useState([]);

  const [imgGrid, setImgGrid] = React.useState([]);

  const [reloadpage, setReloadpage] = React.useState(false);


  function matchTiles(tiles){
    let ImgSrc1 = tiles[0].querySelector('img');
    let ImgSrc2 = tiles[1].querySelector('img');

    const img1 = ImgSrc1.src.replace(/^.*[\\/]/, '');
    const img2 = ImgSrc2.src.replace(/^.*[\\/]/, '');

    return img1 === img2 ? true : false;
  }

  function gameOver(leftTiles){
    if(leftTiles === 0){
      console.log("Game Over 🥳🥳🥳");
      console.log("🏆 Score :" + score);
      console.log("⚛️ Attempts:" + attempts);
    }
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
            score <= 0 ? setScore(0) : setScore(score - 20);
            
            tilesToMatch.forEach(tile => {
              tile.dataset.flipped = "false";
              tile.setAttribute("disabled", false)
            });
            storeTiles([]);
          }else{
            setScore(score + 100);
            setTilesLeft(tilesLeft - 2);
            tilesToMatch.forEach(tile => {
              tile.dataset.flipped = "done";
              tile.setAttribute("disabled", true)
            });
            storeTiles([]);
            gameOver(tilesLeft);
          }
        }, 800);
        
      }
    }

  }

  // Create Game Grid --------------------------------
  function randmiseImages(arr){
    
    for (let i = 0; i < 36; i++) {
      let randomIndex = Math.floor(Math.random() * 36);

      let temp = arr[randomIndex];

      arr[randomIndex] = arr[i];
      arr[i] = temp; 
    }
    setImgGrid(arr);
    setTilesLeft(arr.length);
  }

  function pageReload(){
    window.location.reload();
  }


  React.useEffect(() => {
    let tempArr = [...imgArr,...imgArr,...imgArr,...imgArr]

    randmiseImages(tempArr);

  },[])

  return (
    <div className='App'>
    <div className='game'>
        <div className='title'>
          <div className="box">M</div>
          <div className="box">E</div>
          <div className="box">M</div>
          <div className="box">O</div>
          <div className="box">R</div>
          <div className="box">Y</div>

          <div className="box">G</div>
          <div className="box">A</div>
          <div className="box">M</div>
          <div className="box">E</div>
        </div>


        <Draggable>
          {
            tilesLeft === 0 ? <h3>Hurray🎉 Game finished 🥳</h3> : ""
          }
            <p className='score'>Score : <span>{score}</span></p>
            <p className='attempts'>Attempts : <span>{attempts}</span></p>
            <button onClick={pageReload}>Restart</button>
          {
            tilesLeft === 0 ? <button onClick={pageReload}>Play Again</button> : ""
          }
        </Draggable>
        
        <div className="board">
            {
              imgGrid.map((img,index) => (
                <div className="card" onClick={(e) => {
                  //  clickAudio.play(); 
                   flipCard(e);
                  }} data-flipped="false" key={index}>

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

        <p className='attribution'>🔥 icons from <a target="_blank" rel='noreferrer' href="https://free3dicon.com">free3dicon.com</a></p>
      </div>
    </div>
  )
}


