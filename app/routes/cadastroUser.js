module.exports = function(app){
    app.get('/cadastroUser', function(req, res){
        app.app.controllers.cadastroUser.renderCadastro(app, req, res);
    });

    app.post('/cadastroUser', function(req, res){
        app.app.controllers.cadastroUser.criarUsuario(app, req, res);
    });
}