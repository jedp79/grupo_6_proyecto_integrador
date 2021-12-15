const adminToolsMiddleware = (req, res, next)=> {
    res.locals.admin = false;

    if(req.session.admin) {
        res.locals.admin = true;
    }

    next();
}

module.exports = adminToolsMiddleware;