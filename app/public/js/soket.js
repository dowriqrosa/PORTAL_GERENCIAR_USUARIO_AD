var chat = document.getElementById('chat');
var inputPesquisarResponsavel = document.getElementById('pesquisarResponsavel');
var inputResponsavel = document.getElementById('responsavel');
var button = '<button type="button" class="btn btn--green" onclick="clickButtonResponsavel(this)" data-dismiss="modal">';
var fimButton ='</button></br>';
var selectCargo = document.getElementById('cargo');
var selectFuncao = document.getElementById('funcao');
var selectSetor = document.getElementById('setor');
var selectEmpresa = document.getElementById('empresa');
var selectSubSetor = document.getElementById('subSetor');
var inputNomeUsuario= document.getElementById('nomeUsuario');
var botaoCriar= document.getElementById('butaoCriar');
const selectSubSetorClone = '<option disabled="disabled" selected="selected">Sub setor</option>';


var socket = io('http://localhost:3000');
socket.on('listaResponsavel', function (listaResponsavel) {
    //responsaveis.push('msg');
    chat.innerHTML += button + listaResponsavel + fimButton;
    //console.log(listaResponsavel)
});

var pesquisar = function() {
    chat.innerHTML="";
    socket.emit('pesquisarResponsavel', inputPesquisarResponsavel.value);
};

var clickButtonResponsavel = function(button){
    inputResponsavel.value = button.innerHTML;
}

var preencherSelect = function(){
    socket.emit('cargo','cargo');
    socket.emit('funcao','funcao');
    socket.emit('setor','setor');
    socket.emit('empresa','empresa');
}
preencherSelect();

socket.on('listaCargo', function (listaCargo) {
    selectCargo.innerHTML += '<option>'+listaCargo+'</option></br>';
});

socket.on('listaFuncao', function (listaFuncao) {
    selectFuncao.innerHTML += '<option>'+listaFuncao+'</option></br>';
});

socket.on('listaSetor', function (listaSetor) {
    selectSetor.innerHTML += '<option>'+listaSetor+'</option></br>';
});

socket.on('listaEmpresa', function (listaEmpresa) {
    selectEmpresa.innerHTML += '<option>'+listaEmpresa+'</option></br>';
});

const setoresComSubSetor = {
    TI(){
        socket.emit('subSetor','TI');
    }
}

var setorMudanca = function(valueSetor) {
    selectSubSetor.innerHTML = selectSubSetorClone;
    let subSetorAceitos = setoresComSubSetor[valueSetor.value]
    if(subSetorAceitos){
        subSetorAceitos();
    }
}

socket.on('listaSubSetor', function (listaSubsetor) {
    selectSubSetor.innerHTML += '<option>'+listaSubsetor+'</option></br>';
});

$('#responsavel').keydown(function(e) {
    return false;
})

var verificarNomeUsuarioExistente = function(nome){
    if(nome){
        socket.emit('verificarNomeUsuario',nome);
    }
}

socket.on('respostaNomeUsuario', function (existe) {
    if(existe){
        alert('Nome de usuario já existe');
        inputNomeUsuario.style.backgroundColor= '#FF6347';
        botaoCriar.disabled = true;
    }else{
        inputNomeUsuario.style.backgroundColor = 'white';
        botaoCriar.disabled = false;
    }
});


// Esperar o documento carregar
$(document).ready(function () {
    // Usando um pequeno delay de 100ms porque às vezes o navegador preenche o campo logo que o documento está pronto, e pode não funcionar como esperado
    setTimeout(function(){
        $('#nomeUsuario').removeAttr('disabled');
        $('#senha').removeAttr('disabled');
    }, 1000);
});


function openCloseNav(){
    if(estadoNav){
        document.getElementById("mySidenav").style.width = "250px";
        estadoNav = false;
    }else{
        document.getElementById("mySidenav").style.width = "0";
        estadoNav = true;
    }
}