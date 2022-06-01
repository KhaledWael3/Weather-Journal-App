// Setup empty JS object to act as endpoint for all routes
let projectData = {};
// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 4000;
const server = app.listen(port, () => {
  console.log(`running on localhost: ${port}`);
});
// Post route with a callback function to post the data to the server
app.post("/postData", (req, res) => {
  console.log("here", req.body);
  projectData = {
    temp: req.body.temp,
    date: req.body.date,
    content: req.body.content,
  };
  res.send(projectData);
});
// Get route with a callback function to Get the data from the server
app.get("/getAll", (req, res) => {
  res.send(projectData);
});