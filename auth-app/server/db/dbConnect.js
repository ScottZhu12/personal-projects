const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dbConnect = async () => {
  try {
    // use mongoose to connect this app to our database on mongDB using the DB_URL
    await mongoose.connect(process.env.DB_URL);

    console.log('successfully connected to mongoDB Atlas');
  } catch (err) {
    console.log('unable to connect to mongoDB Atlas');
    console.log(err);
  }
};

module.exports = dbConnect;
