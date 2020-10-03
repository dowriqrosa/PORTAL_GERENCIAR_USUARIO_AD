module.exports = function() {

    this.configuracaoAD = {
        url: 'ldap://192.168.100.78',
        //url: 'ldap://172.21.0.126',
        baseDN: 'DC=loan,DC=dark',
        username: 'loan\\lsistemas',
        password: 'Ls!stemas' 
    }

    this.grupoAutorizadoAcessoAplicacao = 'Domain Admins';

    this.listaOUSUsuario = {
        'LOAN': 'OU=LOAN,DC=loan,DC=dark',
            'DIREITORIA': 'OU=DIREITORIA,OU=LOAN,DC=loan,DC=dark',
            'RH': 'OU=RH,OU=LOAN,DC=loan,DC=dark',
            'TI': 'OU=TI,OU=LOAN,DC=loan,DC=dark',
                'BLUE_TEAM': 'OU=BLUE_TEAM,OU=TI,OU=LOAN,DC=loan,DC=dark'
    }

    this.empresas = [
        'LOAN',
        'DARK'
    ]

    this.setores = [
        'DIREITORIA',
        'TI',
        'RH'
    ]

    this.subsetoresTI = [
        'BLUE_TEAM'
    ]

    this.cargo = [
        'Tecnico Informatica',
        'Psicologa',
        'Tecnico em Redes',
        'Direitor Geral'
    ]

    this.funcao = [
        'Responsavel Infra',
        'Psicologa',
        'Suporte',
        'gerente'
    ]

    this.camposADVariaveis = ['physicalDeliveryOfficeName', 'telephoneNumber', 'title', 'company', 'department', 'description', 'mail', 'manager'];


    this.setoresComSubsetores = {
        TI(){
            return subsetoresTI
        }
    }

    return this
}