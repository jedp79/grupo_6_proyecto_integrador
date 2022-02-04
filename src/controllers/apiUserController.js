const db = require('../database/models');

const controller = {
    showAll: (req, res)=> {
        db.Users.findAll({
            attributes: { exclude: ['password', 'cart'] }
        })
            .then(result => {
                for(let object of result) {
                    object.setDataValue('detail', `http://localhost:3000/api/users/${object.id}`);
                }
                res.json({
                    count: result.length,
                    users: result,
                    status: 200 
                });
            })
            .catch(error => {
                res.send(error);
                console.log(error);
            })
    },
    showOne: (req, res)=> {
        db.Users.findByPk(req.params.id, { attributes: { exclude: ['password'] } })
            .then(result => {
                res.json({
                    user: result,
                    status: 200
                })
            })
    }
}

module.exports = controller;