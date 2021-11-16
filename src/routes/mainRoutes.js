//Modulos Node JS
const express = require('express');
const router = express.Router();

//Rutas
const mainController = require('../controllers/mainController');

router.get('/', mainController.home);
router.post('/search', mainController.search);
router.get('/:filter', mainController.filter);

//Exportas Rutas
module.exports = router;