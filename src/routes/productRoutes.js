//Express
const express =  require('express');
const router =  express.Router();

//Controlador
const productControlador = require('../controllers/productController');

router.get('/', productControlador.catalogo);
router.get('/create', productControlador.create);
router.post('/create', productControlador.upload); 
router.get('/:id', productControlador.editor);
router.get('/:id/edit', productControlador.productEdit);
router.put('/:id/edit', productControlador.uploadEdit);
router.get('/productCart', productControlador.productCart);
router.get('/productDetail', productControlador.productDetail);

//Exportar
module.exports = router;


