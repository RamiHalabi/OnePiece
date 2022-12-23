import React, { useState, useRef } from "react";
import "./App.css";
import $ from "jquery";

// Homepage
function App() {
  const [number, setNumber] = useState();
  const [chapter, setChapter] = useState([]);
  const [toggleview, setView] = useState(false);
  const button = useRef();

  // Disable Up and Down Arrows on Keyboard
  $("input[type=number]").on("keydown", function (e) {
    var key = e.key;
    if (key === "ArrowUp" || key === "ArrowDown") {
      e.preventDefault();
    } else {
      return;
    }
  });

  // User clicks 'GO!' button
  const handleChange = (event) => {
    const input = event.target.value;
    const regex = /^\d{0,4}$/; // Regular expression that matches up to 4 digits

    if (regex.test(input)) {
      setNumber(input);
      setView(true);
    }
  };

  async function fetchData() {
    const userURL = "http://localhost:8000/chapter/" + number;
    const response = await fetch(userURL);
    const json = await response.json();
    setChapter(json);
  }

  return (
    <>
      <div className="HomePage">
        <div className="Wrapper">
          <h1 className="h1">One Piece Manga</h1>
          <input
            id="input"
            className="chapterInput"
            type="number"
            min="1"
            max="1090"
            onWheel={(e) => e.target.blur()}
            onChange={handleChange}
            placeholder="Enter Chapter #"
          />
          <button className="go" ref={button} onClick={fetchData}>
            GO!
          </button>
        </div>
        <div style={{ color: "black" }}>{toggleview ? number : null}</div>
        <div>
          {chapter
            ? chapter.map((imgs) => (
                <div>
                  <img src={imgs} title="OP Page" alt="Page" />
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
}

export default App;
