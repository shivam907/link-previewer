const link = require("link-preview-js");
const express = require("express");
let title, des;
function linkPreview(url) {
  link.getLinkPreview(`${url}`).then((data) => {
    title = data.title;
    console.log(data);
  });
}

// linkPreview("https://www.youtube.com/watch?v=LG1wb2JWoRQ&t=2s");

const routers = express.Router();
routers.get("/", (req, res, next) => {
  res.render("index", {
    title: "Hello saare duniya waalo",
  });
});
let url;
routers.post("/", (req, res, next) => {
  //   console.log(req.body);
  url = req.body.title;
  //   console.log(url.title);
  res.redirect("/link-preview");
});
routers.get("/link-preview", (req, res, next) => {
  link.getLinkPreview(`${url}`).then((data) => {
    res.render("link", {
      title: data.title,
      description: data.description,
      img: data.images[0],
    });
  });
});
module.exports = routers;
