const isPrivileged = (req, res, next) => {
    const role = req.session.currentUser.role;
    if (role === 'admin' || role === 'animator') {
        return next();
    } else {
        return res.status(404).render('not-found'); // 404 over 403 to prevent information leak - Baptiste
    };
};

module.exports = isPrivileged;
