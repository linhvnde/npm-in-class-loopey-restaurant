const express = require("express"); //require the package so that we can use it

const app = express(); //the function that will run express and because express is the framework, everything has to run within the framework which is the app

// app.get(path, code) the "code" is a middleware
//when ever have a request to /about, do the function, but need to have the event listener
//the "next" param is relate to the "middleware concept"

app.use(express.static("public")); //we will expose the content of the folder name public

//GET /
app.get("/", function (request, response, next) {
  console.log(
    "hey the request sent",
    request.path,
    request.protocol,
    request.method,
    request.baseUrl
  );
  //response.send(); // this one needs absolute path
  response.sendFile(__dirname + "/views/home-page.html");
});

//GET /contact
app.get("/contact", (req, res, next) => {
  console.log("request to /contact received");
  //res.send();
  res.sendFile(__dirname + "/views/contact-page.html");
});
app.listen(3000, () => {
  console.log("server listens on http://localhost:4000/");
}); //go to this port and listen to actions there
