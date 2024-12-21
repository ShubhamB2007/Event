const { required } = require("joi");
const mongoose = require("mongoose");
 
const eventSchema = new mongoose.Schema({ 
  name: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String },
  time: { type: String },
  venue: { type:String, required:true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  email:{type:String}, 
  image:{type:String},
  capacity: { type: Number, required: true }, 
  availableSeats: { type: Number, required: true }, 

}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema); 

module.exports = Event; 
