const controlador = {
    index: (req, res) => {
        res.render('index');
    },
    login: (req, res) => {
        res.render('login');
    },
    register: (req, res) => {
        res.render('register');
    },
    productCart: (req, res) => {
        res.render('productCart');
    },
    productDetail: (req, res) => {
        res.render('productDetail');
    },
    catalogo: (req, res) => {
        res.render('catalogo');
    },
    cargar: (req, res) => {
        res.render('carga');
    }
}

module.exports = controlador;