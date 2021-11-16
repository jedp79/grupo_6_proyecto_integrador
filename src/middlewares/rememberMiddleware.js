const db = require('../database/models');

const rememberMiddleware = (req, res, next)=> {
    if(req.cookies.remember != undefined && req.session.userLogged == undefined) {
        db.Users.findOne({ where: { email: req.cookies.remember } })
        .then(user => {
                req.session.userLogged = user;
            })
            .catch(error => {
                console.log(error);
                res.send(error);
            })
    } 
    
    next();
}

module.exports = rememberMiddleware;