import React, { useState, useEffect } from 'react';
import './App.css';


// Homepage
function App() {

  const [number, setNumber] = useState();
  

  const handleChange = (event) => {
    const input = event.target.value;
    const regex = /^\d{0,4}$/; // Regular expression that matches up to 4 digits
    if (regex.test(input)) {
      // If the input matches the regular expression, update the value
      setNumber(input);
    }
  }

console.log(number)

  return (


    <div className="App">
      <div className='Wrapper'>
        <h1 className='h1'>One Piece Manga</h1>
        <input 
          className='chapterInput' 
          type="number"
          min = "1"
          max = "1090" 
          onChange={handleChange}
          placeholder="Enter Chapter #" 
        />
      </div>
    </div>
    
  );
}

export default App;
