// instanciando framework para trabalhar sites web
const KEY = 'nome-do-cookie';
const SECRET = 'chave-secreta-aqui!';
var express = require('express');
var app = express()
    , expressSession = require('express-session')
    , cookieParser = require('cookie-parser')
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server)
    , cookie = cookieParser(SECRET)
    , store = new expressSession.MemoryStore()
//engine de modelagem 
app.set('view engine', 'ejs');

//local das views
app.set('views', './app/views');

//bodyparser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

//arquivos de imagem stilo da aplicação
app.use(express.static('./app/public'));

//express session
app.use(expressSession({
    secret: SECRET,
    name: KEY,
    resave: true,
    saveUninitialized: true,
    store: store
}));

// configurando soket.io

app.use(cookie);

// Compartilhando a sessão válida do Express no Socket.IO
io.use(function(socket, next) {
    var data = socket.request;
    cookie(data, {}, function(err) {
        var sessionID = data.signedCookies[KEY];
        store.get(sessionID, function(err, session) {
            if (err || !session) {
                return next(new Error('Acesso negado!'));
            } else {
                socket.handshake.session = session;
                return next();
            }
        });
    });
});

//consig atualizador de rotas
var consign = require('consign');
consign()
    .include('./app/routes')
    .then('./app/modules')
    .then('./app/controllers')
    .into(app);


const configVar = require('./configVar');
var config = configVar();


// Iniciando uma conexão com Socket.IO.
io.sockets.on('connection', function (client) {
    // Recuperando uma sessão Express.
    var session = client.handshake.session;
    client.on('pesquisarResponsavel', function (msg) {
        app.app.modules.ad.pesquisarUsuario(msg, function(usuarios){
            client.emit('listaResponsavel', usuarios);
        });
    });

    client.on('cargo', function (text) {
        for(let i = 0 ; i < config.cargo.length ; i++){
            client.emit('listaCargo', config.cargo[i]);
        }
    });

    client.on('funcao', function (text) {
        for(let i = 0 ; i < config.funcao.length ; i++){
            client.emit('listaFuncao', config.funcao[i]);
        }
    });

    client.on('setor', function (text) {
        for(let i = 0 ; i < config.setores.length ; i++){
            client.emit('listaSetor', config.setores[i]);
        }
    });

    client.on('empresa', function (text) {
        for(let i = 0 ; i < config.empresas.length ; i++){
            client.emit('listaEmpresa', config.empresas[i]);
        }
    });

    client.on('subSetor', function (text) {
        let subSetor = config.setoresComSubsetores[text]();
        for(let i = 0 ; i < subSetor.length ; i++){
            client.emit('listaSubSetor', subSetor[i]);
        }
    });

    client.on('verificarNomeUsuario', function (text) {
        app.app.modules.ad.pesquisarNomeUsuario(text, function(existe){
            client.emit('respostaNomeUsuario', existe);
        });
    });

});

module.exports = server;