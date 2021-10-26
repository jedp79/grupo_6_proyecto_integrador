const path = require('path');
const fs = require('fs');

const controlador = {
    productCart: (req, res) => {
        res.render('productCart');
    },
    productDetail: (req, res) => {
        res.render('productDetail');
    },
    catalogo: (req, res) => {
        res.render('catalogo');
    },
    create: (req, res) => {
        res.render('carga');
    },
    upload: (req, res) => {
        let fileName = path.join(__dirname, '../database/products.json');
        let allProducts = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
        let idNew = allProducts.pop().id + 1;
        let nuevoProducto = {
            id: idNew,
            name: req.body.name,
            image: null,
            price: req.body.price
        }
        allProducts.push(nuevoProducto)
        let allProductsJSON = JSON.stringify(allProducts, null, ' ');
        fs.writeFileSync(fileName, allProductsJSON);

        res.redirect('/products/create');
    },
    editor: (req, res) => {
        let idProducto = req.params.id;
        res.render('editor', { products: idProducto });
    },
    productEdit: (req, res) => {
        let fileName = path.join(__dirname, '../database/products.json');
        let allProducts = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
        let productToEdit = allProducts.find(product => req.params.id == product.id);
        res.render('productEdit', { data: { name: productToEdit.name, price: productToEdit.price, id: productToEdit.id }} )
    },
    uploadEdit: (req, res) => {
        res.send('req.params')
    }
}

module.exports = controlador;