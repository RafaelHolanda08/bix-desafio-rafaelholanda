Para rodar os testes existem 2 maneiras.

Primeira maneira, instalando o Cypress na máquina e via UI do navegador. Para isso rode as seguintes linhas de comando dentro do repositório.

npm install --global yarn 

yarn init

yarn add cypress -D

yarn cypress open

Obs: Pode rodar o código de instalar o yarn sem ser a versão global.


Segunda Maneira.

Rode o projeto via docker e os testes serão executados via linha de comando, para isso build o docker e execute o docker, na dúvida siga as instruções abaixo (Necessário ter o docker instalado).

docker build -t nome-da-imagem-desejada .

docker images (comando devolverá as imagens na máquina)

docker run (nome da imagem ou id da imagem)

Obs: sim é necessário colocar o . no docker Build
