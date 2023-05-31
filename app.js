const express = require("express"); //require the package so that we can use it
const hbs = require("hbs");

const app = express(); //the function that will run express and because express is the framework, everything has to run within the framework which is the app

// app.get(path, code) the "code" is a middleware
//when ever have a request to /about, do the function, but need to have the event listener
//the "next" param is relate to the "middleware concept"

app.use(express.static("public")); //we will expose the content of the folder name public
app.set("views", __dirname + "/views"); //tells our Express app where to look for our views
app.set("view engine", "hbs"); //sets HBS as the template engine
hbs.registerPartials(__dirname + "/views/partials"); //tell HBS which directory we use for partials

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
app.get("/pizzas", (req, res, next) => {
  console.log("request to /pizzas received");
  //res.send();
  res.send("page for pizzas");
});

//GET/pizzas/margarita
app.get("/pizzas/margarita", (req, res, next) => {
  console.log("request to /pizzas/margarita received");
  //res.sendFile("path of the file");
  // res.send("page for margarita");
  //res.render("subdirectory/nameOfTemplateNoExtension",infoWeWantToPassForTheRender)//showing the template, render the template
  const dataMargarita = {
    title: "Pizza Margarita",
    price: 12,
    recommendedDrink: "beer",
    imageFile: "pizza-margarita.jpg",
    ingredients: ["mozzarella", "tomato sauce", "basilicum"],
  };
  res.render("product", dataMargarita);
});
//GET/pizzas/veggie
app.get("/pizzas/veggie", (req, res, next) => {
  console.log("request to /pizzas/veggie received");
  //res.send();
  const dataVeggie = {
    title: "Veggie Pizza",
    price: 15,
    recommendedDrink: "power smoothie",
    imageFile: "pizza-veggie.jpg",
    ingredients: ["cherry tomatoes", "basilicum", "Olives"],
  };
  res.render("product", dataVeggie);
});
//GET/pizzas/seafood
app.get("/pizzas/seafood", (req, res, next) => {
  console.log("request to /pizzas/seafood received");
  //res.send();
  const dataSeafood = {
    title: "Seafood Pizza",
    // price: 20,
    recommendedDrink: "white wine",
    imageFile: "pizza-seafood.jpg",
    ingredients: ["tomato sauce", "garlic", "prawn"],
  };
  res.render("product", dataSeafood);
});

app.listen(3001, () => {
  console.log("server listens on http://localhost:3001/");
}); //go to this port and listen to actions there
