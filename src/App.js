import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import $ from 'jquery';


// Homepage
function App() {

  const [number, setNumber] = useState();
  const [toggleview,setView] = useState(false);
  const button = useRef();


  // Disable mouse scrolling
  $('input[type=number]').on('mousewheel',function(e){ $(this).blur(); });
  

  // Disable Up and Down Arrows on Keyboard
  $('input[type=number]').on('keydown',function(e) {
      var key = e.key ;
      if(key === 'ArrowUp' || key === 'ArrowDown' ) {
    e.preventDefault();
      } else {return;}
  });

   

  const handleChange = (event) => {

    const input = event.target.value;
    const regex = /^\d{0,4}$/; // Regular expression that matches up to 4 digits

    window.onclick = (event) => {


      if (event.target.contains(button.current) && event.target == button.current && regex.test(input)) { 
            setNumber(input);
            loadChapter();
      } else { console.log("outside"); }
    }
  }

  const loadChapter = () => {
    setView(true)
  }

  // button text is interferring with reading click


  return (


    <div className="App">
      <div className='Wrapper'>
        <h1 className='h1'>One Piece Manga</h1>
        <input 
          id='input'
          className='chapterInput' 
          type="number"
          min = "1"
          max = "1090" 
          onwheel="event.preventDefault()"
          onBlur={handleChange}
          placeholder="Enter Chapter #" 
        />
        <button className="go" ref={button}>GO!</button>
      </div>
      <div>
        {toggleview ? number : null}
      </div>
    </div>
    
  );
}

export default App;
