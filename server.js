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
var db = firebase.database();

const express = require("express");
var bodyParser = require("body-parser");
const app = express();

app.use((request, res, next) => {
  console.log(request.headers);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Using bodyParser as a middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.sendfile("byte-app/public/index.html");
});

// app.post("/login", function(req, res) {
//   var user_name = req.body.user;
//   var password = req.body.password;
//   console.log("User name = " + user_name + ", password is " + password);
//   res.end("done");
// });

function writeData(msgtxt) {
  const timestamp = String(new Date()).slice(0, 24);
  db.ref(`messages/${timestamp}`).set({
    msg_text: msgtxt
  });
}

app.get("/messages", function(req, res) {
  var message = req.body.message;
  console.log("Message = " + message);
  // console.log("data(server): ", readData());
  var ref = db.ref("messages/");
  ref.on(
    "value",
    function(snapshot) {
      res.send(snapshot.val());

      console.log("snap:", snapshot.val());
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );
  //res.send(readData());
});

app.post("/messages", function(req, res) {
  var message = req.body.message;
  console.log("Message = " + message);
  writeData(message);
  // console.log("data(server): ", readData());
  var ref = db.ref("messages/");
  ref.on(
    "value",
    function(snapshot) {
      res.send(snapshot.val());

      console.log("snap:", snapshot.val());
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );
  //res.send(readData());
});

// function readData() {
//   let results = null;
//   var ref = db.ref("messages/");
//   // Attach an asynchronous callback to read the data at our posts reference
//   ref.on(
//     "value",
//     function(snapshot) {
//       results = snapshot.val();
//       console.log("snap:", snapshot.val());
//     },
//     function(errorObject) {
//       console.log("The read failed: " + errorObject.code);
//     }
//   );

//   return results;
// }

app.listen(9000, function() {
  console.log("server is running on port 9000");
});
