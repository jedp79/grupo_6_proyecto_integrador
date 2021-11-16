//Modulos Node JS
const express = require('express');
const router = express.Router();

//Express Validator
const { check } = require('express-validator');

const validations = [
    check('name').notEmpty().withMessage('Debes completar el nombre'),
    check('email').notEmpty().withMessage('Debes completar el email').bail().isEmail().withMessage('Debes completar un email valido'),
    check('password').notEmpty().withMessage('Debes completar la contraseña'),
    check('repassword').custom((value, { req }) => {
        if(value !== req.body.password) {
            throw new Error('Las contraseñas deben coincidir');
        } else {
            return true;
        }
    })
];

//Middleware
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

//Rutas
const userController = require('../controllers/userController');

router.get('/register', guestMiddleware, userController.registerForm);
router.get('/login', guestMiddleware, userController.loginForm);
router.post('/register', validations, userController.createUser);
router.post('/login', userController.loginInto);
router.get('/profile', authMiddleware, userController.profile);
router.get('/logout', userController.logout);

//Exportar
module.exports = router;