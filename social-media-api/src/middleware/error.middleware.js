const errorMiddleware = (err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
};

export default errorMiddleware;
