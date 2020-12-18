const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// Routes
//API routes
app.get("/api/notes", function(req, res) {
  //Use the fs module to read the file
  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err;
  //THEN parse the file contents with JSON parse to get the real data 
    let note = JSON.parse(data);
    console.log(note);
  //Send the parsed data to the client with res.json  
    return res.json(note);
  })
});

app.post("/api/notes", function(req, res) {
  // Access the posted data in req.body

  //use the fs module to read the file
  //then parse the file contents with JSON.parse() to the real data
  //Push req.body to the array list.
  //JSON.stringify() the array list back into JSON string
  //Save the content back to the db.json file with the fs module

});

app.delete("/api/notes/:id", function(req, res) {
  // Acces :id from 'req.params.id'
  //Use the fs module to read the file
  //THEN parse the file contents with JSON parse to get the real data 
  
  //Find the matching index using .findIndex()
  //Remove the target element using .splice()

  // Return any type of success message

})

//Random unique password
//create random id using password generator!! letters, num, dashes
//uuid npm package


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
