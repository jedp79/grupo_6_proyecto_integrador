//Express
const express =  require('express');
const router =  express.Router();

//Controlador
const mainControlador = require('../controllers/mainController');

router.get('/', mainControlador.index);
router.get('/login', mainControlador.login);
router.get('/register', mainControlador.register);

//Exportar
module.exports = router;