/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
const NODE_ENV = 'development';
const sendErrDev = (err, res) => {
  res.status(err.statusCode).json({ err: err.originalError });
};

const sendErrProd = (err, res) => {
  if (err.originalError.code === 11000 && err.name === 'MongoError') return res.status(400).json({ status: err.status, message: 'This resource already exists.' });
  if (err.originalError.name === 'TokenExpiredError') return res.status(401).json({ status: 'Fail', message: 'Token is expired, please log in again' });
  if (err.originalError.name === 'JsonWebTokenError') return res.status(401).json({ status: 'Fail', message: 'invalid token' });
  if (err.originalError.name === 'NetworkError') return res.status(401).json({ status: 'Fail', message: 'invalid token' });
  if (err.originalError.name === 'CastError') return res.status(401).json({ status: 'Fail', message: 'Invalid data type provided for a field.' });
  if (err.originalError.name === 'ValidationError') return res.status(401).json({ status: 'Fail', message: 'Invalid data type provided for a field.' });
  if (err.isOperation) return res.status(err.statusCode).json({ message: err.message });

  res.status(500).json({ message: 'An unexpected error occurred.' });
};

// eslint-disable-next-line no-unused-vars
const errorController = (err, req, res, next) => {
  if (NODE_ENV === 'development') {
    sendErrDev(err, res);
  } else if (NODE_ENV === 'production') {
    sendErrProd(err, res);
  }
};

export default errorController;
