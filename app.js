const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const https = require("https");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var email = req.body.email;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  var jsonData = JSON.stringify(data);
  var url = `https://${process.env.MailChimpServer}.api.mailchimp.com/3.0/lists/${process.env.MailChimpAudienceListId}`;
  var options = {
    method: "POST",
    auth: `tonton:${process.env.MailChimpApiKey}`
  };

  const httpsRequest = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
  });

  //httpsRequest.write(jsonData);
  httpsRequest.end();

});

app.listen(port, console.log(`Server is now listening to port ${port}.`));
