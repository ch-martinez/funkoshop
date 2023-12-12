const clientRequired = (req, res, next) => {
    if (!req.session.isClient && !req.session.isAdmin) {
        return res.redirect("/auth/login")
    }
    next();
}

module.exports = clientRequired;
