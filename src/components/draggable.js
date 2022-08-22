import React from 'react'

export default function Draggable(props) {

    const [xPos, setXPos] = React.useState(0);
    const [yPos, setYPos] = React.useState(0);

    const box = React.useRef(null); 

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

        // for touch devices 
        window.addEventListener('touchstart', dragStart);
        window.addEventListener("touchmove", drag);
        window.addEventListener("touchend", dragEnd);

        // for mouse events 
        window.addEventListener('mousedown', dragStart, false)
        window.addEventListener("mousemove", drag, false)
        window.addEventListener("mouseup", dragEnd, false)

      },[])

  return (
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
  )
}
