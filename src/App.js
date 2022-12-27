import React, { useState, useRef } from "react";
import "./App.css";
import $ from "jquery";

// Homepage
function App() {
  const [number, setNumber] = useState();
  const [chapter, setChapter] = useState([]);
  const button = useRef();

  // Disable Up and Down Arrows on Keyboard
  $("input[type=number]").on("keydown", function (e) {
    var key = e.key;
    console.log(key);
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
    }
  };

  // load chapter from user input
  async function getChapter() {
    const userURL = "http://localhost:8000/chapter/" + number;
    const response = await fetch(userURL);
    const json = await response.json();
    setChapter(json);
  }

  // load latest chapter from LC button click
  async function latestChapter() {
    const userURL = "http://localhost:8000/chapter/" + 9999;
    const response = await fetch(userURL);
    const json = await response.json();
    setChapter(json);
  }

  // user wants to view different chapter
  const newChapter = () => {
    setChapter([]);
  };

  return (
    <>
      <div className="HomePage">
        <div className="Wrapper">
          {chapter.length > 1 ? (
            chapter.map((imgs) => (
              <div>
                <img src={imgs} className="img" title="OP Page" alt="Page" />
              </div>
            ))
          ) : (
            <div>
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
              <button className="go" ref={button} onClick={getChapter}>
                {" "}
                GO!
              </button>
            </div>
          )}
        </div>
        <button onClick={latestChapter} className="LCBtn">
          Latest Chapter
        </button>
        <button className="reloadBtn" onClick={newChapter}>
          New Chapter
        </button>
      </div>
    </>
  );
}

export default App;
