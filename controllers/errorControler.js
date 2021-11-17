// 4 parameters - express automatically recognize that this is error handling middleware
module.exports = (err, req, res, next) => {
  // console.log(err.stack);
  // show us where the error happened

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
