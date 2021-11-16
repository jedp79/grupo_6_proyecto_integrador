//Sequelize
const db = require('../database/models');
const { Op } = require('sequelize');

module.exports = {
    home: (req, res)=> {
        db.Products.findAll()
            .then(products => {
                res.render('home', { products: products });
            })
            .catch(error => {
                console.log(error);
                res.send(error);
            });
    },
    filter: (req, res)=> {
        db.Products.findAll({ where: { category: req.params.filter } })
            .then(products => {
                res.render('home', { products: products, category: req.params.filter });
            })
            .catch(error => {
                console.log(error);
                res.send(error);
            });
    },
    search: (req, res)=> {
        console.log(req.body)
        db.Products.findAll({ where: { name: { [Op.like]: `%${req.body.search}%` } } })
            .then(products => {
                return res.render('home', { products: products });
            })
            .catch(error => {
                console.log(error);
                res.send(error);
            });
    }
}