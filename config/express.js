var express = require('express');
var bodyParser = require('body-parser');
var load = require('express-load');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var helmet = require('helmet');

module.exports = function() {
    //Instância do Express
    var app = express();

    //Porta da aplicação	
    //app.set('port', 3000);
    app.set('port', process.env.PORT || 5000);

    //Ativação dos middlewares de cookie, sessão e inicialização do passport
    app.use(cookieParser());
    app.use(session(
        {
            secret: 'homem avestruz',
            resave: true,
            saveUninitialized: true
        }
    ));
    app.use(passport.initialize());
    app.use(passport.session());
    
    //Ativa o Helmet, um middleware do Express
    app.use(helmet());
    app.disable('x-powered-by');
    app.use(helmet.hidePoweredBy({ setTo: 'SALVE PROFESSOR' }));
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());

    //Middleware
    app.use(express.static('./public'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(require('method-override')());

    //Definir Engine para a View
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    
    //Carregar pastas
    load('models', {cwd: 'app'})
        .then('controllers')
        .then('routes/auth.js')
        .then('routes')
        .into(app);
    
    //Caso nenhuma rota atenda
    app.get('*', function(req, res) {
        res.status(404).render('404');
    });

    return app;
};