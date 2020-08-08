// jshint esversion : 6

const express = require("express");

const bodyParser = require("body-parser");

// const request = require("request");

const app = express();

const https  = require('https');

var data; 

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000);

app.use(express.static("public"));

app.get("/", function (req, res) {
  console.log("Server is running on port 3000");
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;
  console.log(fname + " " + lname + " " + email);

  data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNAME: lname,
        },
      },
    ],
  };
});

var jsonData = JSON.stringify(data);

const url = "https://us17.api.mailchimp.com/3.0/lists/ac33f69f8c";

var options = {
    method : "POST",
    auth : "shantanu_shinde:dd2571cc999bf76acc736b6ae588d2e1-us17",  
};

const request = https.request(url, options, function(response){
    
    response.on("data", function(data){
        
        console.log(JSON.parse(data));

    });
    request.write(jsonData);
    request.end();

});



// api key
// dd2571cc999bf76acc736b6ae588d2e1-us17

// list id
// ac33f69f8c
