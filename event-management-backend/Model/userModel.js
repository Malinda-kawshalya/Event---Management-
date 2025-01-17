const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    gmail: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
      type: String,
      required: true,
  },
  age: {
   type: Number,
   required: true,
},
gender: {
   type: String,
   required: true,
},
});

module.exports = mongoose.model("User", userSchema);
