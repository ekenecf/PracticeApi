// const fs = require("fs");
const Tour = require("../models/tourModel")

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

exports.getAllTour = async (req, res) => {
  try {
    const tours = await Tour.find();
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

exports.updateTour = (req, res) => {
  // const id = +(req.params.id);
  // const tour = tours.find(el => el.id === id)

  res.status(200).json({
    status: "success",
    // data: {
    //   tour: "Tour Updated",
    // },
  });
};

exports.createTour = async (req, res) => {
  try{
    // const newTour = new Tour({});
    // newTour.save();
  
    //A better way of creating is using
    const newTour = await Tour.create(req.body)
    // console.log(req.body);
    res.status(201).json({
      status: "success",
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
