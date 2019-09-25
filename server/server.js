const express = require("express");
var bodyParser = require("body-parser");
const app = express();

app.use((request, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Using bodyParser as a middle-ware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.json());

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products we want to use
require("firebase/auth");
require("firebase/firestore");

var firebase = require("firebase");

// Set the configuration for firebase db
var config = {
  apiKey: "AIzaSyB9UIN0jV9T_Gayc-or6SpBIef_HolEXHU",
  authDomain: "byte-c4de4.firebaseapp.com",
  databaseURL: "https://byte-c4de4.firebaseio.com",
  storageBucket: "byte-c4de4.appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
var db = firebase.database();

// Write message to db
function writeMessage(messageText) {
  let messageRef = db.ref(`messages`).push({
    messageText,
    timestamp: firebase.database.ServerValue.TIMESTAMP
  });
  let messageID = messageRef.key;
  return messageID;
}

const path = require("path");
//Static file declaration
app.use(express.static(path.join(__dirname, "byte-app/build")));

//production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "byte-app/build")));
  app.get("*", (req, res) => {
    res.sendfile(path.join((__dirname, "byte-app/build/index.html")));
  });
}

//build mode
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/byte-app/public/index.html"));
});

// //production mode
// if (process.env.NODE_ENV === "production");
// {
//   app.use("/", express.static(path.join(__dirname, "byte-app/public")));
// }

// // Display html
// app.get("/", function(req, res) {
//   res.sendfile("byte-app/public/index.html");
// });

// app.get("/manifest.json", function(req, res) {
//   res.sendfile("byte-app/public/manifest.json");
// });

// Retrieve messages from db
app.get("/messages", function(req, res) {
  retrieveMessages(res);
});

// Post message to db
app.post("/messages", function(req, res) {
  var message = req.body.message;
  let messageID = writeMessage(message);
  res.send({ messageID });
});

// Retrieve all messages from db
function retrieveMessages(res) {
  var ref = db.ref("messages/");
  ref.once(
    "value",
    function(snapshot) {
      let rawData = snapshot.val();
      let messages = [];
      for (var id in rawData) {
        messages.push({ id, ...rawData[id] });
      }

      res.send(messages.reverse());
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );
}

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log("server is running on port ", port);
});
