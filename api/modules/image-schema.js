const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let imageSchema = new Schema({
  title: String,
  date: String
},
{
    timestamps: true
});

module.exports = imageSchema;
