//Modulos Node JS
const express = require('express');
const router = express.Router();

//Controlador
const apiProductController = require('../controllers/apiProductControler');

//Rutas
router.get('/', apiProductController.showAll);
router.get('/:id', apiProductController.showOne);

//Exportar
module.exports = router;