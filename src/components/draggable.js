import React from 'react'

export default function Draggable(props) {

    const [xPos, setXPos] = React.useState(0);
    const [yPos, setYPos] = React.useState(0);

    const box = React.useRef(null); 
    // const container = React.useRef(null);

    function changeX(x){
        setXPos(x);
    }

    function changeY(y){
        setYPos(y);
    }

    React.useEffect(()=> {
        let active = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        function dragStart(e){

            if (e.type === "touchstart") {
                initialX = e.touches[0].clientX - xOffset;
                initialY = e.touches[0].clientY - yOffset;
            } else {
                initialX = e.clientX - xOffset;
                initialY = e.clientY - yOffset;
            }

            if(e.target === box.current){
                active = true;
            }

        }

        function dragEnd(){

            initialX = currentX;
            initialY = currentY;
            
            active = false;

        }

        function drag(e){
            if (active) {
            
                e.preventDefault();
                
                if (e.type === "touchmove") {
                    currentX = e.touches[0].clientX - initialX;
                    currentY = e.touches[0].clientY - initialY;
                } else {
                    currentX = e.clientX - initialX;
                    currentY = e.clientY - initialY;
                }
    
                xOffset = currentX;
                yOffset = currentY;

                changeX(currentX);
                changeY(currentY);
            }
        }

        const container = document.getElementById('container');

        // for touch devices 
        container.addEventListener('touchstart', dragStart);
        container.addEventListener("touchend", drag);
        container.addEventListener("touchmove", dragEnd);

        // for mouse events 
        container.addEventListener('mousedown', dragStart, false)
        container.addEventListener("mousemove", drag, false)
        container.addEventListener("mouseup", dragEnd, false)

      },[])

  return (
    <div id="container">
        <div  className="draggable" style={{transform : `translate(${xPos}px, ${yPos}px)`}}>
            <div ref={box} className="drag">
                <p>Scoreboard</p>
                <button className="close" onClick={() => {props.displayfunc(false)}}></button>
            </div>
            <div className="content">
                {
                    props.children
                }
            </div>
        </div>
    </div>
  )
}
