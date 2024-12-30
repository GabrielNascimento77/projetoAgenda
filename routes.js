const express = require('express');
const route = express.Router();
const indexController = require('./app/controllers/indexController');
const loginController = require('./app/controllers/loginController');
const registroController = require('./app/controllers/registroController');
const contatoController = require('./app/controllers/contatoController');
const { loginRequired } = require('./middlewares/middleware');

//Rotas index
route.get('/', indexController.index);

//Rotas de login
route.get('/login/index', loginController.index);
route.post('/login', loginController.login);
route.get('/logout', loginController.logout);

//Rotas de cadastro
route.get('/cadastre-se', registroController.cadastro);
route.post('/registro', registroController.registro);

//Rotas de contato
route.get('/contato', loginRequired, contatoController.novoContato);
route.post('/registrar-contato', loginRequired, contatoController.register);
route.get('/contato/:id', loginRequired, contatoController.editIndex);
route.post('/contato/edit/:id', loginRequired, contatoController.edit);
route.get('/contato/excluir/:id', loginRequired, contatoController.delete);

module.exports = route;