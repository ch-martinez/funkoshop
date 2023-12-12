const adminRequired = (req, res, next) => {
    if (!req.session.isAdmin) {
        return res.redirect("/auth/login")
    }
    next();
}

module.exports = adminRequired;
