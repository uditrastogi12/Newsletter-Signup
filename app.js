const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");

});


app.post("/", function(req, res) {
  var fName = req.body.fName;
  var lName = req.body.lName;
  var mail = req.body.email;
  //  console.log(fName ,lName ,mail);

  var data = {
    members: [{
      email_address: mail,
      status: "subscribed",
      merge_feilds: {
                          FNAME: fName,
                          LNAME: lName
                      }
    }]
  };

  var jsonData = JSON.stringify(data);

  //     url : "https://us5.api.mailchimp.com/3.0/lists/4a8b669588";
  //     var options = {
  //
  //     method : "POST",
  // //     header : {
  // //       "Authorization": "udit e3c6fe276b20e6ffc8ac5c9df2058856-us5"
  // //     },
  //     auth: "rastogi:e3c6fe276b20e6ffc8ac5c9df2058856-us5"
  //   //  body: jsonData
  //   };

  const url = "https://us5.api.mailchimp.com/3.0/lists/4a8b669588";
  //
  const options = {

    method: "POST",
    auth: "rastogi:e3c6fe276b20e6ffc8ac5c9df2058856-us5"
    //body: jsonData
  }
   //const body = jsonData;

     const request = https.request(url, options, function(response, error, body) {
    console.log(response.statusCode);

    //correct
    // if (response.statusCode === 200) {
    //   //  res.sendFile(__dirname + "/success.html");
    //   console.log("success");
    // } else {
    //   //  res.sendFile(__dirname + "/failure.html");
    //   console.log("failure");
    // }

    if (error) {
      //console.log(error);
      // res.send("THERE WAS SOMETHING WRONG!");
      res.sendFile(__dirname + "/failure.html");
    } else {
        if (response.statusCode === 200) {
          //  res.sendFile(__dirname + "/success.html");
          //console.log("success");
          //res.send("Successfully Subscribed!")
          res.sendFile(__dirname + "/success.html");
        } else {
          //  res.sendFile(__dirname + "/failure.html");
          //console.log("failure");
        //  res.send("THERE WAS SOMETHING WRONG!");
        res.sendFile(__dirname + "/failure.html");
        }
      //console.log(response.statusCode);
    }


    // response.on("data", (data) => {
    //     console.log(JSON.parse(data));
    //  });
  });
  request.write(jsonData);
  request.end();
});




// request(options,function(error,response,body){
//     if(error)
//     {
//       console.log(error);
//     }
//     else{
//       console.log(response.statusCode);
//     }
// });

app.post("/failure", (req,res) => {
    res.redirect("/");
});


app.listen(3000 || process.env.PORT, function() {
  console.log("Server is running on port 3000");
})

//API KEY
//e3c6fe276b20e6ffc8ac5c9df2058856-us5
//e3c6fe276b20e6ffc8ac5c9df2058856-us5
//LIST ID
//4a8b669588














// const express = require("express");
// const bodyParser = require("body-parser");
// const request = require("request");
// const https = require("https");
//
// const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
//
// app.use(express.static("public"))
//
// app.get("/", function(req, res)  {
//     res.sendFile(__dirname + "/signup.html");
// })
//
// app.post("/", function(req, res)  {
//     const dataShortcut = req.body;
//     const fName = dataShortcut.fName;
//     const lName = dataShortcut.sName;
//     const mail = dataShortcut.email;
//
//     const userData = {
//         members: [
//             {
//                 email_address: mail,
//                 status: "subscribed",
//                 merge_feilds: {
//                     FNAME: fName,
//                     LNAME: lName
//                 }
//             }
//         ]
//     }
//
//     const jsonData = JSON.stringify(userData);
//
//     const url = "https://us5.api.mailchimp.com/3.0/lists/4a8b669588";
//
//     const options = {
//         method: "POST",
//         auth: "rastogi:e3c6fe276b20e6ffc8ac5c9df2058856-us5"
//     }
//
//     const request = https.request(url, options, (response) => {
//         console.log(response.statusCode);
//         if (response.statusCode === 200) {
//           //  res.sendFile(__dirname + "/success.html");
//           console.log("success");
//         } else {
//           //  res.sendFile(__dirname + "/failure.html");
//           console.log("failure");
//         }
//
//
//         // response.on("data", (data) => {
//         //     console.log(JSON.parse(data));
//       //  });
//     });
//     request.write(jsonData);
//     request.end();
// });
//
// // app.post("/failure", (req,res) => {
// //     res.redirect("/");
// // });
//
//
// app.listen(process.env.PORT ||  3000, () => {
//     console.log("Server is running");
// });
//
//
