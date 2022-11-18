const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

// mongoose.connect returns a promise thats why we can use the .then() method.
mongoose.connect(DB, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
}).then(() => console.log("DB connection successful")
  // console.log(con.connections);
)



// const testTour = new Tour({
//   name: 'Movenent to Ijinikin1',
//   rating: 4.8,
//   price: 200
// });

// testTour.save().then((doc) => {
//   console.log(doc)
// }).catch(err => {
//   console.log("Error Spotted", err)
// });

const app = require('./app');
const port = process.env.PORT || 3000;

// console.log('App env', app.get('env'));
// console.log('App env', process.env);

// Start server
app.listen(port, () => {
  console.log(`app running on port ${port}...`)
});
