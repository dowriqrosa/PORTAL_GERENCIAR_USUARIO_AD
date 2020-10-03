# PORTAL_GERENCIAR_USUARIO_AD  
  
  O projeto surgiu de um problema com a padronização na hora de criar usuarios, na tentativa de diminuir erros humanos no momento de cadastro de usuarios no AD e possibilitar que o RH ou outros setores possam realizar este cadastro sem dempeder das equipes de TI. Procurei fazer de uma forma que não necessite instalar nada no servidor AD.

# Link de uma VM de testes
https://drive.google.com/file/d/1_DCQO2bT-MkuzEshn8MA_JTTBkO283iR/view?usp=sharing

# Usuario Administrador:
Usuario: Administrator  
Senha: Adm!nad  

# Usuario leitura do ad:
Usuario: lsistemas  
Senha: Ls!stemas

# Usuario de teste do Sistema

Usuario: drosa  
Senha: 123456789

# Script de criação do usuario

new-ADUser -name 'Dowriq Rosa' -samAccountName 'drosa' -AccountPassword (ConvertTo-SecureString "123456789" -AsPlainText -force) -Path 'OU=BLUE_TEAM,OU=TI,OU=LOAN,DC=loan,DC=dark' -Enabled $true -OtherAttributes @{givenName="Dowriq"; sn="Rosa" ; displayName="Dowriq henrRosaique" ; userPrincipalName="drosa@loan.dark" ; telephoneNumber="7131150546" ; title="Tecnico de TI" ; company="LOAN" ; department="TI" ; description="Analista" ; mail="dowriq.rosa@loan.dark"; physicalDeliveryOfficeName="BLUE_TEAM"; manager="cn=Paulo Cesar,OU=BLUE_TEAM,OU=TI,OU=LOAN,DC=loan,DC=dark"}

# Vareaveis que necessitar ser alterada para se adequar ao seu ambiente
Procurei o maximo deixar em um local unico todas as vareaveis a serem alteradas.  

No Arquivo configVar.js:  
  
configuracaoAD = Que esta as configurações para comunicação com o Dominio.  
grupoAutorizadoAcessoAplicacao = Nome do grupo para evitar que todos os usuarios tenham acesso ao portal.  
listaOUSUsuario = onde estara todas as OUS que os usuarios podem ser cadastrados.  
empresas = nome das empresas que prestam serviço e que necessitem de usuarios.  
setores = setores da empresa.  
subsetoresTI = sub setores da area de TI (pode ser criado outros subsetores).  
cargo = cargos existentes.  
funcao = funções existentes.  
camposADVariaveis = São os capos que iram conter algum dado do usuarios no momento do cadastro.  
setoresComSubsetores = contem funções que retornar os subsetores dos setores que contem subsetores.  
  
  
  Arquivo soket.js  
  
setoresComSubSetor = contem funções que retornar os subsetores dos setores que contem subsetores (Arquivo pertencente ao FrontEnd).  
socket = contem o endereço e porta do servidor.
  
  
  Arquivo cadastoUser.js
  
  
  res.send = contem o endereço e porta do servidor

  # Execultar

  execultar o CMD ou powershell como admnistrador navegar ate a pasta e execultat "node .".  

  No caso do servidor que disponibilizarei para teste eu criei um serviço usando o "nssm-2.24" para toda vez que eu precisar reinicar o servidor não ter me preocupar em iniciar iniciar o server.
  