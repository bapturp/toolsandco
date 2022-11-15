const isAdmin = (req, res, next) => {
    if (req.session.currentUser.role === 'admin') {
        return next();
    } else {
        // Note from Baptiste:
        // Technically we should return HTTP 403 Forbidden but we're letting the attackers know that a protected route exists.
        // But if the admin cookie/session has expired, she/he will experience a 404 which is misleading in this case.
        return res.status(404).render("not-found");
    };
};

module.exports = isAdmin