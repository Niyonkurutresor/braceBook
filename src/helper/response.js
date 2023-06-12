const out = (res, status, message, data) => {
  res.status(status).json({ message, data });
};

export default out;
