const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config/.env' }); // will read our variables from the file and save them in node.js env variables
// console.log(process.env);

const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log(con.connections);
    console.log('DB connected');
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'Test tour',
  rating: 4.7,
  price: 287,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((e) => {
    console.log(e);
  });

const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
