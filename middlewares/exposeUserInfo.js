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
