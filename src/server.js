const cors = require("cors");
const express = require("express");
const request = require("request");
const cheerio = require("cheerio");
const app = express();

app.use(cors());

const chapterListURL = "https://onepiecechapters.com/mangas/5/one-piece";

request(chapterListURL, (error, response, html) => {
  if (!error && response.statusCode === 200) {
    const $ = cheerio.load(html); // load document
    const chapters = []; // list containing chapter URLs

    // load each chapterURL into an array
    $("a").each((i, element) => {
      const src = $(element).attr("href");
      chapters.push(src);
    });

    // User hit 'GO!' after typing in chapter
    app.get("/chapter/:id", (req, res) => {
      //get chapter number and corresponding chapter URL from the request
      const chapter = req.params.id;
      const chapterURL = "https://onepiecechapters.com" + chapters[chapter];

      // get pages from selected chapters' url
      request(chapterURL, (error, requestRes, html) => {
        if (!error && res.statusCode === 200) {
          const $ = cheerio.load(html); // load document
          const images = $("img"); // all imgs at URL
          const imageUrls = []; // chapter pages array

          // put each image on website into array
          images.each((i, image) => {
            const src = $(image).attr("src");
            imageUrls.push(src);
          });
          res.send(imageUrls);
        } else {
          res.status(500).send("Error retrieving images");
        }
      });
    });
  }
});

app.listen(8000, () => {
  console.log("API server listening on port 8000");
});
