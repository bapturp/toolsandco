const getActualUrl = (req, res, next) => {
  req.session.previousUrl = req.originalUrl;
  return next();
};

module.exports = getActualUrl;
