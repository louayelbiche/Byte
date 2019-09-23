// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

var firebase = require("firebase");

// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
  apiKey: "AIzaSyB9UIN0jV9T_Gayc-or6SpBIef_HolEXHU",
  authDomain: "byte-c4de4.firebaseapp.com",
  databaseURL: "https://byte-c4de4.firebaseio.com",
  storageBucket: "byte-c4de4.appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

const express = require("express");
var bodyParser = require("body-parser");
const app = express();

app.use((request, response, next) => {
  console.log(request.headers);
  next();
});

// Using bodyParser as a middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use((request, response, next) => {
//   request.chance = Math.random()
//   next()
// })

// app.get('/', (request, response) => {
//   response.json({
//     chance: request.chance
//   })
// })

app.get("/jsontest", (request, response) => {
  //response.send('Hello from Express!')
  response.json({ title: "Hello JSON" });
});

app.get("/", function(req, res) {
  res.sendfile("index.html");
});

app.post("/login", function(req, res) {
  var user_name = req.body.user;
  var password = req.body.password;
  console.log("User name = " + user_name + ", password is " + password);
  res.end("done");
});

function writeData(msgtxt) {
  firebase
    .database()
    .ref("messages/")
    .set({
      message: msgtxt
    });
}

app.post("/message", function(req, res) {
  var message = req.body.message;
  console.log("Message = " + message);
  writeData(message);
  res.end("done");
});

app.listen(3000, function() {
  console.log("server is running on port 3000");
});
