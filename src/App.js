import React, { useState, useRef } from "react";
import "./App.css";
import $ from "jquery";
import title from "./onepiece.png";

// Homepage
function App() {
  const [number, setNumber] = useState();
  const [chapter, setChapter] = useState([]);
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

  // various UI buttons
  const ChapterBTNS = [
    <>
      <button onClick={latestChapter} className="LCBtn">
        Latest Chapter
      </button>
    </>,
    <>
      <button className="newChapter" onClick={newChapter}>
        New Chapter
      </button>
    </>,
  ];

  // error handler that checks for invalid search querys
  const validChapter = () => {
    // TODO: verify that user searches for a "real" chapter. No chapters below 0, or greater than the current chapter can be searched for.
    // will need to recieve a response from server.js to do this.
    // want to initiate animation upon invalid chapter for user experience
  };

  return (
    <>
      <div className="HomePage">
        <div className="Wrapper">
          {chapter.length > 1 ? (
            <>
              {ChapterBTNS[1]}
              {chapter.map((imgs) => (
                <div>
                  <img src={imgs} className="img" title="OP Page" alt="Page" />
                </div>
              ))}
              {ChapterBTNS[1]}
            </>
          ) : (
            <div>
              <div>
                <img
                  src={title}
                  title="One Piece Manga"
                  alt="OP Manga"
                  className="titleimg"
                ></img>
              </div>
              <input
                id="input"
                className="chapterInput"
                type="number"
                min="1"
                onWheel={(e) => e.target.blur()}
                onChange={handleChange}
                placeholder="Enter Chapter #"
              />
              <button className="go" ref={button} onClick={getChapter}>
                {" "}
                GO!
              </button>
              <div />
              {ChapterBTNS}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
