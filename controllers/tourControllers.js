// const fs = require("fs");
const Tour = require("../models/tourModel")
const APiFeatures = require('../utils/apiFeatures')

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../toursFolder/tours.json`)
// );

// exports.checkID = (req, res, next, val) => {
//   // console.log(`Tour id is ${val}`);
//   if (+req.params.id > tours.length) {
//     return res.status(404).json({
//       status: "Not found",
//       message: "Invalid search ID",
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: "failed",
//       message: "Missing name or price",
//     });
//   }
//   next();
// };

//Aliasing means creating a route just for a specific purpose, you first create a route for it. You can check the routes file to see the configuration
exports.aliasTopTours = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingAverage,price';
  req.query.fields = 'name,price,ratingAverage,summary,difficulty';
  next();
};


exports.getAllTour = async (req, res) => {
  try {
    // BUILD QUERY
    //1) FILTERING
    // const queryObj = { ...req.query }
    // console.log("Query Object", queryObj);
    // // This excludedFields tries to exclude page, sort, etc from the query
    // const excludedFields = ['page', 'sort', 'limit', 'fields'];
    // excludedFields.forEach(el => delete queryObj[el]);

    // //1b) ADVANCED FILTERING ie using greaterThanorEqualsTo(gte);
    // let queryString = JSON.stringify(queryObj);
    // //We want to replace gte, gt, lte, lt as it is coming without the $ sign with mongoose($gte, $gt, $lte, $lt)
    // // In regex we use the g sign at the end so that we can get the occurence multiple times, if not we would only get the first occurence.
    // //replace fxn accepts 2 parameters. We use it here to match what we have b4 to what we have presently.
    // queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    
    // // Tour.find() returns a query
    // let query = Tour.find(JSON.parse(queryString));
    //2) SORTING
    // if(req.query.sort) {
    //   // To sort based on multiple criteria we use comma on the params eg 127.0.0.1:8000/api/v1/tours?sort=price,duration etc
    //   const sortBy = req.query.sort.split(',').join(' ')
    //   console.log(sortBy)
    //   query = query.sort(sortBy);
    // } else {
    //   //Sort based on the time of creation in descending order
    //   query = query.sort('-createdAt')
    // }

    //3) FIELD LIMITING
    // if(req.query.fields) {
    //   const fields = req.query.fields.split(',').join(' ')
    //   query = query.select(fields)
    // } else {
    //   // We can select all fields except a field eg __v using the select(-the fieldname)
    //   query = query.select('-__v');
    // }

    //4) For pagination, you need a page and a limit fields eg 127.0.0.1:8000/api/v1/tours?page=2&limit=10
    //Skip is the amount of result that needs to be skipped before querying data
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100
    //eg 127.0.0.1:8000/api/v1/tours?page=3&limit=10, means give me page3 of the document with 10collections()
    // const skip = (page - 1) * limit;
    // query = query.skip(skip).limit(limit);
    // if(req.query.page) {
    //   // countDocuments helps us to get number of documents which returns a promise
    //   const numTours = await Tour.countDocuments();
    //   if (skip >= numTours) throw new Error("Page does not exist!");
    // }

    // const tours = await Tour.find()
    // EXECUTE QUERY
    const features = new APiFeatures(Tour.find(), req.query)
    .filter().sort().limitFields().pagination();
    console.log("Queried object", features)
    const tours = await features.query
    // const tours = Tour.find().where("rating").equals(5.1).where("name").equals("Ekene");
    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      numberOfTours: tours.length,
      data: {
        tours,
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'Failed',
      message: error
    })
  }
};

exports.getTour = async (req, res) => {
  try {
    // We use req.params.id cos we are querying for Id. 
   // Tour.findOne({_id: req.params.id}) is same as Tour.findById(req.params.id)
    const tour = await Tour.findById(req.params.id)
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'Failed',
      message: error
    })
  }

  // console.log(+(req.params.id))

  // const tour = tours.find((el) => el.id === id);
  // if (id > tours.length) {
  // if (!tour) {
  //     return res.status(404).json({
  //         status: 'Not found',
  //         message: 'Invalid search ID'
  //     })
  // }

};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    res.status(200).json({
      status: "success",
      data: {
        tour: tour,
      },
    });
  } catch(error) {
    res.status(404).json({
      status: 'Failed',
      message: error
    })
  }
  // const id = +(req.params.id);
  // const tour = tours.find(el => el.id === id)  
};

exports.createTour = async (req, res) => {
  try{
    // const newTour = new Tour({});
    // newTour.save();
  
    //A better way of creating is using
    const newTour = await Tour.create(req.body)
    // console.log(req.body);
    res.status(201).json({
      status: "created",
      data: {
        newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error
    })
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id, req.body)
    res.status(204).json({
      status: "success",
      data: null
    });
  } catch(error) {
    res.status(404).json({
      status: 'Failed',
      message: error
    })
  }
  // const id = +(req.params.id);
  // const tour = tours.find(el => el.id === id)  
};