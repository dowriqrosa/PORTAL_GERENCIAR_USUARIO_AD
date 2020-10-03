module.exports = function(){
    this.renderLogin = function (app, req, res){
        res.render("login");
    }

    this.login = function(app, req, res){
        var username = req.body.usuario;
        var password = req.body.senha;
        app.app.modules.ad.authenticate(username, password, function(autenticado) {
            if(autenticado != 0){
                req.session.autorizado = true;
                req.session.username = username;
                res.redirect("cadastroUser");
            }else{
                res.render("login");
            }
        });
    }
    return this;
}