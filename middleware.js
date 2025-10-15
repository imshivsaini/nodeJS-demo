const addUserMiddleware = (req, res, next) => {
  req.user = "Guest";
  next();
};

export default addUserMiddleware;
