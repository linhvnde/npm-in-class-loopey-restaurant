// const {mongoose, Schema} = require("mongoose");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const pizzaSchema = new Schema({
  title: {
    type: String,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    min: 5,
  },
  isVeggie: {
    type: Boolean,
    default: false,
  },
  dough: {
    type: String,
    enum: ["classic", "extra thin", "with cheese", "with galic"],
  },
  ingredients: [String],
  imageFile: String,
});

//create Model
const Pizza = mongoose.model("Pizza", pizzaSchema);
module.exports = Pizza; //export the model so that the mongoose-playround.js can use the model
