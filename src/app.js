//Modulos Node JS
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');

//Levantar Servidor
app.listen(process.env.PORT || 3000, ()=> {
    console.log('Servidor corriendo');
});

//Archivos publicos
app.use(express.static(path.join(__dirname, '../public')));

//Motor de renderizado
app.set('view engine', 'ejs');

//Encoded
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Cookie Parser
app.use(cookieParser());

//Session
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));

//Metodos HTTP
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//Middleware Globales
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
app.use(userLoggedMiddleware);
const rememberMiddleware = require('./middlewares/rememberMiddleware');
app.use(rememberMiddleware);
const adminToolsMiddleware = require('./middlewares/adminToolsMiddleware');
app.use(adminToolsMiddleware);

//Rutas
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

app.use('/', mainRoutes);
app.use('/user', userRoutes);
app.use('/product', productRoutes);