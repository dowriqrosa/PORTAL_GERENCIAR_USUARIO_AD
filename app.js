//modulo server
var app = require('./config/server');

//porta  de requisição
app.listen(3000, function(){
    console.log('execultando servidor');
});