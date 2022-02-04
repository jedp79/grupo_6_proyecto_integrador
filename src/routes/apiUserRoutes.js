//Modulos Node JS
const express = require('express');
const router = express.Router();

//Controlador
const apiUserController = require('../controllers/apiUserController');

//Rutas
router.get('/', apiUserController.showAll);
router.get('/:id', apiUserController.showOne);

//Exportar
module.exports = router;