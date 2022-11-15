const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const app = require('./app');
const port = process.env.PORT || 3000;

// console.log('App env', app.get('env'));
// console.log('App env', process.env);

// Start server
app.listen(port, () => {
  console.log(`app running on port ${port}...`)
});
