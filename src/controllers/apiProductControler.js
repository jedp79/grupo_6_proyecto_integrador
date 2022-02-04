const db = require("../database/models");

const controlador = {
    showAll: (req, res)=> {
        db.Products.findAll()
            .then(result => {
                for(let object of result) {
                    object.setDataValue('detail', `http://localhost:3000/api/products/${object.id}`);
                }

                return res.json({
                    count: result.length,
                    countByCategory: {
                        tortas: result.filter(object => object.category == 'tortas').length,
                        muffins: result.filter(object => object.category == 'muffins').length,
                        galletas: result.filter(object => object.category == 'galletas').length
                    },
                    products: result,
                    status: 200
                })
            })
            .catch(error => {
                console.log(error);
                res.send(error);
            })
    },
    showOne: (req, res)=> {
        db.Products.findByPk(req.params.id)
            .then(result => {
                return res.json({
                    product: result,
                    status: 200
                })
            })
            .catch(error => {
                console.log(error);
                res.send(error);
            })
    }

}

module.exports = controlador;