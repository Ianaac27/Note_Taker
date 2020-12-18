var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 8080;

//Stored notes array
var notes = [];

// Routes
//API routes
app.get("/api/notes", function(req, res) {
  return res.json(notes);
});

//HTML Routes
app.get("/", function(req, res) {
  res.send("Hey!");
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Starts the server to begin listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
