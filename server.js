//Variáveis de ambiente
require('dotenv').config();

//express
const express = require('express');
const app = express();

//Mongoose para Mongodb
const mongoose = require('mongoose');

//Conexão com a base de dados
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        console.log('Conexão com a base de dados efetuada!');
        app.emit('pronto');
    })
    .catch(e => console.log(e));

//Sesions
const session = require('express-session');
const MongoStore = require('connect-mongo');

//Mensagens autodestrutivas
const flash = require('connect-flash');

//Helmet
//const helmet = require('helmet');

//CSRF - Tokens para formulários
const csrf = require('csurf');

//Middlewares
const { checkCsrfError, csrfMiddleware, middlewareGlobal } = require('./middlewares/middleware');

//Routes
const routes = require('./routes');

//Para tratar o body das requisições
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Conteúdo estático
app.use(express.static('./public'));

//Configuração da sessão
const sessionOptions = session({
    secret: 'burkhardtrenardshadegriffincalvert',
    store: MongoStore.create({
        mongoUrl: process.env.CONNECTIONSTRING,
        collectionName: 'sessions',
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());

//Motor de views
app.set('views', './app/views');
app.set('view engine', 'ejs');

//csrf
app.use(csrf());

//Middlewares
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(middlewareGlobal);

app.use(routes);

app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('Servidor online');
    });
});



