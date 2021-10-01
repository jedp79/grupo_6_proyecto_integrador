//Express y Node JS
const express = require('express');
const app = express();
const path = require('path');

//Levantar Servidor
app.listen(3000, ()=>{
    console.log('Servidor corriendo');
});
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');

//Rutas
const mainRoutes = require('./routes/mainRoutes');

app.use('/', mainRoutes);