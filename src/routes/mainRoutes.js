//Express
const express =  require('express');
const router =  express.Router();

//Controlador
const mainControlador = require('../controllers/mainController');

router.get('/', mainControlador.index);
router.get('/login', mainControlador.login);
router.get('/register', mainControlador.register);
router.get('/productCart', mainControlador.productCart);
router.get('/productDetail', mainControlador.productDetail);
router.get('/catalogo', mainControlador.catalogo);
router.get('/cargar', mainControlador.cargar);

//Exportar
module.exports = router;