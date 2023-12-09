const reqLogin = (req, res, next) => {
    if(!req.session.isLog){
        return res.redirect('/auth/login')
    }
    next()
}

module.exports = {
    reqLogin
}