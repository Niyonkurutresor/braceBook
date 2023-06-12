/* eslint-disable eqeqeq */
const NODE_ENV = 'development';

const sendErrDev = (err, res) => {

};

const sendErrProd = (err, res) => {

};

const errorController = (err, req, res) => {
  if (NODE_ENV == 'development') {
    sendErrDev(err, res);
  } else if (NODE_ENV == 'production') {
    sendErrProd(err, res);
  }
};
export default errorController;
