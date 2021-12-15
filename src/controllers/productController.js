//Base de datos
const db = require('../database/models');

//Sequelize
const { Op } = require('sequelize');
const { sequelize } = require('../database/models');

const controller = {
    productUpload: (req, res)=> {
        res.render('productUpload');
    },
    createProduct: (req, res)=> {
        db.Products.create({
            name: req.body.name,
            price: req.body.price,
            img: req.file.filename,
            category: req.body.category,
            description: req.body.description
        }).then(()=> {
            return res.redirect('/');
        }).catch(error => {
            console.log(error);
            res.send(error);
        })
    },
    showProduct: (req, res)=> {
        let productSelected = db.Products.findOne({ where: { id: req.params.id }});
        let relatedProducts = db.Products.findAll({ where: { [Op.not]: { id: req.params.id } }, limit: 5 });
        
        let msg = null;
        if(req.params.action == 'add'){
            msg = 'Producto añadido'
        }

        Promise.all([productSelected, relatedProducts])
            .then(([resultProduct, resultRelated])=> {
                return res.render('product', { product: resultProduct, related: resultRelated, popup: msg })
            }).catch(error => {
                console.log(error);
                res.send(error);
            })
    },
    addToCart: (req, res)=> {
        let useProductCreate = db.UserProduct.create({
            user_id: req.session.userLogged.id,
            product_id: req.params.id
        });

        req.session.userLogged.cart = req.session.userLogged.cart + 1

        let userUpdate = db.Users.update({
            cart: req.session.userLogged.cart
        },{
            where: { id: req.session.userLogged.id }
        });
        
        Promise.all([useProductCreate, userUpdate])
            .then(()=> {
                return res.redirect(`/product/${req.params.id}/add`);
            })
            .catch(error => {
                console.log(error);
                res.send(error);
            })  
    },
    productCart: (req, res)=> {
        db.Users.findAll({ 
            include: [{ association: 'products' }], 
            raw: true, 
            nest: true, 
            where: { id: req.session.userLogged.id } 
        })
        .then(products => {
            console.log(products)
            return res.render('productCart', { products: products });
        })
         .catch(error => {
            console.log(error);
            res.send(error);
        })
    },
    removeFromCart: (req, res)=> {
        req.session.userLogged.cart = parseInt(req.session.userLogged.cart) - 1

        let userUpdate = db.Users.update({
            cart: req.session.userLogged.cart 
        },{
            where: { id: req.session.userLogged.id }
        })

        let userProductDelete = db.UserProduct.destroy({
            where: { user_id: req.session.userLogged.id, product_id: req.params.id  }
        })
        
        Promise.all([userUpdate, userProductDelete])
            .then(()=> {
                return res.redirect('/product/cart');
            })
            .catch(error => {
                console.log(error);
                res.send(error);
            })
    },
    editList: (req, res)=> {
        db.Products.findAll()
            .then(products => {
                return res.render('editList', { products })
            })
            .catch(error => {
                console.log(error);
                res.send(error);
            });
    },
    editProduct: (req, res)=> {
        db.Products.findByPk(req.params.id)
            .then(product => {
                return res.render('editProduct', { product })
            })
            .catch(error => {
                console.log(error);
                res.send(error);
            });
    },
    uploadEdit: (req, res)=> {
        db.Products.update(
            {
                name: req.body.name,
                price: req.body.price,
                category: req.body.category,
                description: req.body.description
            },{
                where: { id: req.params.id }
            }
        )
        .then(()=> {
            return res.redirect('/product/edit');
        })
        .catch(error => {
            console.log(error);
            res.send(error);
        })
    },
    deleteProduct: (req, res)=> {
        db.Products.destroy({ where: { id: req.params.id } })
            .then(()=> {
                return res.redirect('/product/edit');
            })
            .catch(error => {
                console.log(error);
                res.send(error);
            })
    },
    dashboard: (req, res)=> {
        res.render('dashboard');
    }
}

module.exports = controller;