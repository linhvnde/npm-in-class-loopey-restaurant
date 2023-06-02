const express = require("express"); //require the package so that we can use it
const hbs = require("hbs");
const mongoose = require("mongoose");
const Pizza = require("./models/Pizza.model");

const app = express(); //the function that will run express and because express is the framework, everything has to run within the framework which is the app

// app.get(path, code) the "code" is a middleware
//when ever have a request to /about, do the function, but need to have the event listener
//the "next" param is relate to the "middleware concept"

app.use(express.static("public")); //we will expose the content of the folder name public
app.set("views", __dirname + "/views"); //tells our Express app where to look for our views
app.set("view engine", "hbs"); //sets HBS as the template engine
hbs.registerPartials(__dirname + "/views/partials"); //tell HBS which directory we use for partials

//CONNECT to DB
mongoose
  .connect("mongodb://127.0.0.1/loopeyRestaurant")
  .then((x) => {
    console.log(`Connected! Database name: "${x.connections[0].name}"`);
  })
  .catch((e) => console.log("error connecting to DB", e));

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
  response.render("home-page");
});

//GET /contact
app.get("/contact", (req, res, next) => {
  console.log("request to /contact received");
  //res.send();
  res.render("contact-page");
});

//GET/pizzas
// app.get("/pizzas", (req, res, next) => {
//   console.log("request to /pizzas received");
//   //res.send();
//   res.send("page for pizzas");
// });

app.get("/pizzas", (req, res, next) => {
  Pizza.find()
    .then((pizzasArr) => {
      res.render("product-list", { pizzasArr });
    })
    .catch((e) => {
      console.log("Problem with DB Operation", e);
    });
});

//GET/pizzas/margarita
/*app.get("/pizzas/margarita", (req, res, next) => {
  console.log("request to /pizzas/margarita received");
  //res.sendFile("path of the file");
  // res.send("page for margarita");
  //res.render("subdirectory/nameOfTemplateNoExtension",infoWeWantToPassForTheRender)//showing the template, render the template

  //dont need the hard code
  /*
  const dataMargarita = {
    title: "Pizza Margarita",
    price: 12,
    recommendedDrink: "beer",
    imageFile: "pizza-margarita.jpg",
    ingredients: ["mozzarella", "tomato sauce", "basilicum"],
  };
  */
/*
  Pizza.findOne({ title: "margarita" })
    .then((pizzaDetailsFromDB) => {
      res.render("product", pizzaDetailsFromDB);
    })
    .catch((err) => {
      console.log("Cannot connect to DB", err);
    });
});
//GET/pizzas/veggie
app.get("/pizzas/veggie", (req, res, next) => {
  console.log("request to /pizzas/veggie received");
  //res.send();
  Pizza.findOne({ title: "veggie" })
    .then((pizzaDetailsFromDB) => {
      res.render("product", pizzaDetailsFromDB);
    })
    .catch((err) => {
      console.log("Cannot connect to DB", err);
    });
});
//GET/pizzas/seafood
app.get("/pizzas/seafood", (req, res, next) => {
  console.log("request to /pizzas/seafood received");
  //res.send();
  Pizza.findOne({ title: "seafood" })
    .then((pizzaDetailsFromDB) => {
      res.render("product", pizzaDetailsFromDB);
    })
    .catch((err) => {
      console.log("Cannot connect to DB", err);
    });
});
*/
//
//

////// ROUTE PARAMS
app.get("/pizzas/:pizzaName", (req, res, next) => {
  Pizza.findOne({ title: req.params.pizzaName })
    .then((pizzaDetailsFromDB) => {
      res.render("product", pizzaDetailsFromDB);
    })
    .catch((e) => {
      console.log("Problem with DB Operation", e);
    });
});

//
//
//

app.listen(3001, () => {
  console.log("server listens on http://localhost:3001/");
}); //go to this port and listen to actions there
