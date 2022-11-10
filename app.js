const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoute');
const userRouter = require('./routes/userRoute');

const app = express();
const port = 3000;

// Middleware is a fxn that modifies the incoming request data
//This middleware is used when we want to make post requests
app.use(express.json());
// Morgan middleware is used to log requests to the console
app.use(morgan('dev'));

// To create our own middleWare functions, we must use app.use to access the middleware eg
// All middlewares execute based on the order they are called. Also with next(), it makes the next middleware run cos without it, the next wont run.
app.use((req, res, next) => {
    console.log("Hello from the middleware" );
    next();
});

// To create another middleware, lets use the req.requestTime
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next()
});

// Routes
// Parent route using mounting which in this case is the tourRouter and userRouter
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// app.get('/api/v1/tours', getAllTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour)
// app.post('/api/v1/tours', createTour)
module.exports = app;