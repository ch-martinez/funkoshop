const requireLogin = (req, res, next) => {
    if(!req.session.isLog){
        return res.redirect('/auth/login')
    }
    next()
}

module.exports = {
    requireLogin
}