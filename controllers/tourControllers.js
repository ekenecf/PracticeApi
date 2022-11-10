const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../toursFolder/tours.json`)
);

exports.checkID = (req, res, next, val) => {
  // console.log(`Tour id is ${val}`);
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: "Not found",
      message: "Invalid search ID",
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  // console.log("Hello from the middleware" );
  const reqBody = req.body;
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "failed",
      message: "Missing name or price",
    });
  }
  next();
};

exports.getAllTour = (req, res) => {
  //We can access the req.requestTime inside this function ie
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    numberOfTours: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  // console.log(+(req.params.id))
  const id = +req.params.id;
  const tour = tours.find((el) => el.id === id);
  // if (id > tours.length) {
  // if (!tour) {
  //     return res.status(404).json({
  //         status: 'Not found',
  //         message: 'Invalid search ID'
  //     })
  // }
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

exports.updateTour = (req, res) => {
  // const id = +(req.params.id);
  // const tour = tours.find(el => el.id === id)

  res.status(200).json({
    status: "success",
    data: {
      tour: "Tour Updated",
    },
  });
};

exports.createTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/toursFolder/tours.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          newTour,
        },
      });
    }
  );
};
