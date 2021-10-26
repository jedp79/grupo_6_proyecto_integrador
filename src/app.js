//Express y Node JS
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

//Levantar Servidor
app.listen(3000, ()=>{
    console.log('Servidor corriendo');
});
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

//Rutas
const mainRoutes = require('./routes/mainRoutes');
const productRoutes = require('./routes/productRoutes');

app.use('/', mainRoutes);
app.use('/products', productRoutes)