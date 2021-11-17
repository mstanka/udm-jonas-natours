const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorControler');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//// Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // HTTP request level Middleware(logger). It proves to be very helpful while debugging and also if you want to create Log files.
}

app.use(express.json()); // middleware - modify incoming req data

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//// Routes

app.use('/api/v1/tours', tourRouter); // mounting a route on a new router
app.use('api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // passing error express will skip all other middlewares and goes to the error handling middleware
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
