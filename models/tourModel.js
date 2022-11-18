const mongoose = require('mongoose');

// we create models out of schemas
const tourSchema = new mongoose.Schema({
    //To remove a parameter, you use select:false
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      // if a name must be unique, use the unique property
      unique: true,
      trim: true
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a grup size']
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty level']
    },
    ratingAverage: {
      type: Number,
      //default is used to assign a default value
      default: 4.5
    },
    ratingQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price']
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary']
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have an imageCover']
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now()
    },
    startDates: [Date]
  })
  
  //We create a model by using mongoose.model('name of model')
  const Tour = mongoose.model('Tour', tourSchema);

  module.exports = Tour;
