module.exports = function(){
    this.renderCadastro = function (app, req, res){
        if(req.session.autorizado){
            res.render("cadastroUser");
        }else{
            res.redirect("/");
        }
    }
    this.criarUsuario = function(app, req, res){
        var dados = req.body;
        if(req.session.autorizado){
            app.app.modules.ad.criarUsuario(dados,function(criado){
                if(criado){
                    res.set('Content-Type', 'text/html');
                    res.send(Buffer.from("<script> alert('Usuario criado com sucesso'); window.location.replace('http://localhost:3000/cadastroUser'); </script>"));
                }else{
                    res.set('Content-Type', 'text/html');
                    res.send(Buffer.from("<script> alert('Ocorreu um erro favor tentar novamente'); window.location.replace('http://localhost:3000/cadastroUser'); </script>"));
                }
            });
        }else{
            res.redirect("/");
        }
    }
    return this;
}