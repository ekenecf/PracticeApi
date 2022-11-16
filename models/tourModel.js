const mongoose = require('mongoose');

// we create models out of schemas
const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      // if a name must be unique, use the unique property
      unique: true
    },
    rating: {
      type: Number,
      //default is used to assign a default value
      default: 4.5
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price']
    }
  })
  
  //We create a model by using mongoose.model('name of model')
  const Tour = mongoose.model('Tour', tourSchema);

  module.exports = Tour;