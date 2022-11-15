//Everything that has nothing to do with express should be done outside the app.js file ie in the server.js file

const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoute");
const userRouter = require("./routes/userRoute");

const app = express();

// Middleware is a fxn that modifies the incoming request data
//This middleware is used when we want to make post requests
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  // Morgan middleware is used to log requests to the console
  app.use(morgan("dev"));
}

//To serve static files we use an inbuilt middleware called express.ststic(with the directory) ie
// Then you open the route with server/publicContent it http://localhost:3000/index.html
app.use(express.static(`${__dirname}/public`));

// To create our own middleWare functions, we must use app.use to access the middleware eg
// All middlewares execute based on the order they are called. Also with next(), it makes the next middleware run cos without it, the next wont run.
app.use((req, res, next) => {
  // console.log("Hello from the middleware" );
  next();
});

// To create another middleware, we can use the req.requestTime
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
// Parent route using mounting which in this case is the tourRouter and userRouter
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// app.get('/api/v1/tours', getAllTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.post('/api/v1/tours', createTour)
module.exports = app;
