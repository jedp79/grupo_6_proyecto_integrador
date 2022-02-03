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

//Express Validator
const { check } = require('express-validator');

const validations = [
    check('name').notEmpty().withMessage('Debes completar el nombre'),
    check('price').notEmpty().withMessage('Debes completar el precio'),
    check('description').notEmpty().withMessage('Debes completar la descripción')
]

//Middlewares
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

//Rutas
const productController = require('../controllers/productController');

router.get('/upload', adminMiddleware, productController.productUpload);
router.post('/upload', uploadFile.single('img'), productController.createProduct);
router.get('/cart', productController.productCart);
router.get('/:id/:action', productController.showProduct);
router.post('/:id', authMiddleware, productController.addToCart);
router.delete('/:id/delete', productController.removeFromCart);
router.get('/edit', adminMiddleware, productController.editList);
router.get('/edit/:id/form', adminMiddleware, productController.editProduct);
router.put('/edit/:id/form', adminMiddleware, validations, productController.uploadEdit);
router.delete('/edit/:id/form', adminMiddleware, productController.deleteProduct);
router.get('/dashboard', productController.dashboard);


//Exportar Rutas
module.exports = router;