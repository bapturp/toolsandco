// expose to views user information:
//
// req.locals.currentUser.username
// req.locals.currentUser.email
// req.locals.currentUser.role

const exposeUserInfo = (req, res, next) => {
  if (req.session.currentUser) {
    res.locals.currentUser = req.session.currentUser;
    res.locals.isLoggedIn = true;
    if (req.session.currentUser.role === "admin") {
      res.locals.isAdmin = true;
    }
  }
  return next();
};

module.exports = exposeUserInfo;
