const express = require("express");

const app = express();

const https = require("https");

app.use(express.static("public"));

app.listen(process.env.port || 3000 , function() {
  console.log("server started at 3000");
});

app.get("/", function(req,res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res) {
  res.redirect("/game");
});

app.get("/game", function(req,res) {
  res.sendFile(__dirname + "/game.html");
  //questionURL = "https://jservice.io/api/random";
  // https.get(questionURL, function(response) {
  //   response.on("data", function(data) {
  //     const info = JSON.parse(data);
  //     //console.log(info[0].question)
  //     question = info[0].question;
  //     answer = info[0].answer;
  //     //document.getElementById("question").innerHTML = question;
  //
  //     //document.querySelector(“#question”).innerHTML = question;
  //   })
  // })
});
