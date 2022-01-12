//include required modules
const jwt = require('jsonwebtoken');
const config = require('./config');
const rp = require('request-promise');
var nodemailer = require('nodemailer');
// <script type="text/javascript" src="custom.json"></script>

const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
var email, userid, resp;
const port = 4567;


//Use the ApiKey and APISecret from config.js
const payload = {
    iss: config.APIKey,
    exp: ((new Date()).getTime() + 5000)
};
const token = jwt.sign(payload, config.APISecret);


//get the form
app.get('/', (req,res) => res.send(req.body));

//use userinfo from the form and make a post request to /userinfo
app.post('/userinfo', (req, res) => {
  //store the email address of the user in the email variable
    email = req.body.email;
  //check if the email was stored in the console
  console.log(email);
  //Store the options for Zoom API which will be used to make an API call later.
  var options = {
    //You can use a different uri if you're making an API call to a different Zoom endpoint.
    uri: "https://api.zoom.us/v2/users/"+email,
    qs: {
        status: 'active'
    },
    auth: {
        'bearer': token
    },
    headers: {
        'User-Agent': 'Zoom-api-Jwt-Request',
        'content-type': 'application/json'
    },
    json: true //Parse the JSON string in the response
};

//Use request-promise module's .then() method to make request calls.
rp(options)
    .then(function (response) {
      //printing the response on the console
        console.log('User has', response);
        //console.log(typeof response);
        resp = response
        //Adding html to the page
        var title1 ='<center><h3>Your token: </h3></center>'
        var result1 = title1 + '<code><pre style="background-color:#aef8f9;">' + token + '</pre></code>';
        var title ='<center><h3>User\'s information:</h3></center>'
        //Prettify the JSON format using pre tag and JSON.stringify
        var result = title + '<code><pre style="background-color:#aef8f9;">'+JSON.stringify(resp, null, 2)+ '</pre></code>'
        res.send(result1 + '<br>' + result);
        // console.log(response.first_name + response.email );

    })
    .catch(function (err) {
        // API call failed...
        console.log('API call failed, reason ', err);
    });

});

// var sendEmail = response(){
app.post("/newmeeting", async(req, res) => {
  email = "priyam.suthar@teksuninfosys.com";
  // var mydata = JSON.parse(data);
  var options = {
    method: "POST",
    uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
    body: {
      topic: "test create meeting",
      type: 2,

      pre_schedule: true ,
       start_time: "2021-10-19T12:07:21.20-07:00",
       duration: 10,
       // schedule_for : 'priyamsuthar741@gmail.com',

      // type: 1,
      settings: {
        host_video: false,
    participant_video: true,
    join_before_host: true,
    pre_schedule: true ,
     start_time: "",
     duration: 10,
     no_of_employess: 2,
      }
    },
    auth: {
      bearer: token
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json"
    },
    json: true //Parse the JSON string in the response
  };

  rp(options)
    .then(function(response) {
      console.log("response is: ", response);

      res.send("create meeting result: " + JSON.stringify(response));
    })
    .catch(function(err) {
      // API call failed...
      console.log("API call failed, reason ", err);
    });

//email
    var  transporter =  nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'priyam.suthar@teksuninfosys.com',
        pass: 'zgegfuwvafopewjw'
      }
    });

    var maillist = [
      '',
      'priyam.suthar741@gmail.com',

    ];

    // var resEmail = response.password
    // console.log(resEmail);
    var mailOptions = {

      from: 'priyam.suthar@teksuninfosys.com',
      to: maillist,
      subject: " vcbfbn ",
      html : "",
      title : options

    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

});





// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// const msg = {
//   to: 'priyamsuthar741@gmail.com', // Change to your recipient
//   from: 'priyam.suthar@teksuninfosys.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)

//   })


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
