const mongoose = require("mongoose");

const Pizza = require("./models/Pizza.model"); //need to import the model from the Pizza.model.js

mongoose
  .connect("mongodb://127.0.0.1:27017/loopeyRestaurant")
  .then((res) => {
    console.log(
      `Connected successfully Database Name: "${res.connections[0].name}"`
    );
    // console.log("res", res);

    const pizzaOne = {
      title: "g",
      price: 12.99,
      isVeggie: true,
    };
    const pizzaTwo = {
      title: "h",
      price: 11,
    };
    const pizzaThree = {
      title: "i",
      price: 11,
      isVeggie: true,
    };

    //create a new document (a new pizza)
    return Pizza.create(pizzaOne, pizzaTwo, pizzaThree); //.create returns promise
  })
  .then((pizzaFromDB) => {
    console.log("created pizza(s)");
    return Pizza.find(); //return promise and res is array pizzas
  })
  .then((pizzaArr) => {
    return Pizza.updateMany({ price: { $gt: 12 } }, { dough: "with cheese" });
  })
  .then((result) => {
    console.log("HEYYYYYYYY UPDATEEEEEEEE", result);
  })
  .catch((err) => {
    console.log("Error connecting to Mongo", err);
  });
