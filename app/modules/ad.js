var ActiveDirectory = require('activedirectory');
const configVar = require('../../config/configVar');
var config = configVar();
var ad = new ActiveDirectory(config.configuracaoAD);

module.exports = function() {

    this.authenticate = function (usernameA, passwordA, callback) {

        ad.isUserMemberOf (usernameA, config.grupoAutorizadoAcessoAplicacao, function (err, isMember) {
            if (err) {
                console.log(err)
            }

            if (isMember) {
                ad.authenticate (usernameA, passwordA, function (err, auth) {
                    if (auth) {
                        callback(1);
                    } else {
                        callback(0);
                    }
                });
            } else {
                autenticado = 0;
                callback(autenticado);
            }
            
        });
    }

    this.pesquisarUsuario = function (nome, callback) {

        var opts = {
            //baseDN: 'OU=loan,DC=loan,DC=dark',
            filter: 'cn=*' + nome + '*'
        };

        ad.findUsers (opts, true, function (err, users) {
            if ((! users) || (users.length == 0)) {
                //console.log('No users found.');
            } else {
                for (var i = 0 ; i < users.length; i++) {
                    callback(users[i].dn);
                    //console.log('findUsers: '+JSON.stringify(users[i].dn));
                }
            }
        });
    }

    this.pesquisarNomeUsuario = function (sAMAccountName, callback) {

        ad.findUser (sAMAccountName, function (err, user) {

            if (err) {
                console.log('ERROR: ' +JSON.stringify(err));
                return;
            }
        
            if (user) {   
                callback(true);
            } else {
                callback(false);
            } 

        });
    }

    this.criarUsuario = function (form, callback) {

        let camposAD = config.camposADVariaveis;
        let atributos = "";
        for(let i = 0; i < camposAD.length; i++){
            let campo = camposAD[i];
            if(form[campo] && i == camposAD.length-1){
                atributos += campo + '=\'' + form[campo] + '\''
            }else if(form[campo]){
                atributos += campo + '=\'' + form[campo] + '\' ; '
            }
        }

        let codigoCampoName = 'new-ADUser -name \'' + form.nome + ' '+ form.sobrenome + '\' ';
        let codigoCamposamAccountName = '-samAccountName \''+ form.nomeUsuario+ '\' ';
        let codigoCampoAccountPassword = '-AccountPassword (ConvertTo-SecureString \'' + form.senha + '\' -AsPlainText -force) ';
        let codigoCampoPath;
        if (form['physicalDeliveryOfficeName']) {
            codigoCampoPath = '-Path \'' + config.listaOUSUsuario[form['physicalDeliveryOfficeName']] + '\' ';
        } else {
            codigoCampoPath = '-Path \'' + config.listaOUSUsuario[form['department']] + '\' ';
        }
        let codigoCampoEnabled ='-Enabled $true ';
        let codigoOpenCampoOtherAttributes = '-OtherAttributes @{ ';
        let codigoCampogivenName = 'givenName=\'' + form.nome + '\'; ';
        let codigoCampoSN = 'sn=\'' + form.sobrenome + '\'; ';
        let codigoCampoDisplayName = 'displayName=\'' + form.nome + ' '+ form.sobrenome + '\'; ';
        let codigoCampoUserPrincipalName = 'userPrincipalName=\'' + form.nomeUsuario + '@PGEBA.INTRANET\' ; ';
        let codigoCloseCampoOtherAttributes = '}';

        let codigoCompleto = codigoCampoName + codigoCamposamAccountName + codigoCampoAccountPassword + codigoCampoPath + codigoCampoEnabled + codigoOpenCampoOtherAttributes + codigoCampogivenName + codigoCampoSN + codigoCampoDisplayName + codigoCampoUserPrincipalName + atributos + codigoCloseCampoOtherAttributes;

        //console.log(codigoCompleto)
        //return
        const Shell = require('node-powershell');

        const ps = new Shell({
            executionPolicy: 'Bypass',
            noProfile: true
        });

        ps.addCommand(codigoCompleto);
        ps.invoke()
        .then(output => {
            callback(true);
            console.log(output);
        })
        .catch(err => {
            callback(false);
            console.log(err);
        });
    }

    return this;
};
