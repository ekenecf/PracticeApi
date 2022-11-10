const express = require('express');
const fs = require('fs');
const morgan = require('morgan')

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
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/toursFolder/tours.json`));

// Route handlers
const getAllTour = (req, res) => {
    //We can access the req.requestTime inside this function ie
    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        numberOfTours: tours.length,
        data: {
            tours,
        }
    })
}

const getTour = (req, res) => {
    // console.log(+(req.params.id))
    const id = +(req.params.id);
    const tour = tours.find(el => el.id === id)
    // if (id > tours.length) {
    if (!tour) {
        return res.status(404).json({
            status: 'Not found',
            message: 'Invalid search ID'
        })
    }
    res.status(200).json({
        status: "success",
        data: {
            tour,
        }
    });
}

const updateTour = (req, res) => {
    const id = +(req.params.id);
    const tour = tours.find(el => el.id === id)
    if (id > tours.length) {
        return res.status(404).json({
            status: 'Not found',
            message: 'Invalid search ID'
        })
    }
    res.status(200).json({
        status: "success",
        data: {
            tour: 'Tour Updated'
        }
    });
}

const createTour = (req, res) => {
    // console.log(req.body);
    const newId = tours[tours.length - 1].id + 1
    const newTour = Object.assign({id: newId}, req.body);
    tours.push(newTour);

    fs.writeFile(`${__dirname}/toursFolder/tours.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                newTour
            }
        })
    })
}

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'Error',
        message: "This route is not yet defined!"
    })
}

const createUser = (req, res) => {
    res.status(500).json({
        status: 'Error',
        message: "This route is not yet defined!"
    })
}
const getUser = (req, res) => {
    res.status(500).json({
        status: 'Error',
        message: "This route is not yet defined!"
    })
}
const updateUser = (req, res) => {
    res.status(500).json({
        status: 'Error',
        message: "This route is not yet defined!"
    })
}

// Routes
const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').post(createTour).get(getAllTour);
tourRouter.route('/:id').get(getTour).patch(updateTour);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser);

// Parent route using mounting which in this case is the tourRouter and userRouter
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// app.get('/api/v1/tours', getAllTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour)
// app.post('/api/v1/tours', createTour)

// Start server
app.listen(port, () => {
    console.log(`app running on port ${port}...`)
})