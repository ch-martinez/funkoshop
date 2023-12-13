const clientRequired = (req, res, next) => {
    if (!req.session.isLog && !req.session.isAdmin) {
        return res.redirect("/auth/login")
    }
    next();
}

module.exports = clientRequired;
