//Modulos Node JS
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

//Multer
const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, '../public/images/products');
    },
    filename: (req, file, cb)=> {
        cb(null, `img_${Date.now()}_${path.extname(file.originalname)}`);
    }
});

const uploadFile = multer({ storage });

//Rutas
const productController = require('../controllers/productController');

router.get('/upload', productController.productUpload);
router.post('/upload', uploadFile.single('img'), productController.createProduct);
router.get('/cart', productController.productCart);
router.get('/:id/:action', productController.showProduct);
router.post('/:id', productController.addToCart);
router.delete('/:id/delete', productController.removeFromCart);

//Exportar Rutas
module.exports = router;