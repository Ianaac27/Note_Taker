const express = require("express");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// Routes 
// API Routes
app.get("/api/notes", function(req, res) {
  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err;
    let note = JSON.parse(data);
    return res.json(note);
  })
});

app.post("/api/notes", function(req, res) {
  let newNote = req.body;
  console.log(newNote);
  let newID = crypto.randomBytes(16).toString("hex");
  console.log(newID);

  newNote.id = newID;
  console.log(newNote);

  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err;   
  let note = JSON.parse(data);
  note.push(newNote);

  let updatedArray = JSON.stringify(note);
  console.log(updatedArray);

  fs.writeFile('./db/db.json', updatedArray, (err) => {
    if (err) throw err; 
    else {
    console.log("New note added");
    }
  })

  return res.json(updatedArray);
})
});

app.delete("/api/notes/:id", function(req, res) {

console.log( req.params.id );
  
  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err;   
  let note = JSON.parse(data);
  console.log(note);

  note = note.filter(({id }) => id !== req.params.id);

  console.log (note);

  let updatedArray = JSON.stringify(note);

  fs.writeFile('./db/db.json', updatedArray, (err) => {
    if (err) throw err; 
    else {
    console.log("Note Deleted");
    }
  })

  // // Return any type of success message
  return res.json({ ok: true});
})
});

//HTML Routes
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Starts the server to begin listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
