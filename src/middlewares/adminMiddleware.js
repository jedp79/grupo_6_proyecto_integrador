const adminMiddleware = (req, res, next)=> {
    if(!req.session.admin) {
        res.redirect('/');
    }

    next();
}

module.exports = adminMiddleware;