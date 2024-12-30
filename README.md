Projeto de Cadastro e Contato
Este é um projeto desenvolvido com Node.js utilizando o framework Express, MongoDB, EJS e outras tecnologias para criar um sistema simples de registro de usuários e gerenciamento de contatos.

Tecnologias Utilizadas
Node.js: Ambiente de execução JavaScript.
Express: Framework web para Node.js.
MongoDB: Banco de dados NoSQL.
Mongoose: Biblioteca para modelar objetos MongoDB.
EJS: Motor de templates para renderização de HTML.
Express-Session: Gerenciamento de sessões.
Flash: Mensagens autodestrutivas.
CSRF: Proteção contra ataques CSRF.
Funcionalidades
Cadastro de Usuários: Usuários podem criar uma conta no sistema.
Login de Usuários: Usuários podem acessar o sistema após realizar o login.
Cadastro e Edição de Contatos: Os usuários logados podem cadastrar, editar e excluir contatos.
Proteção de Rotas: Algumas rotas são protegidas e exigem login para acesso.
Mensagens de Sucesso e Erro: Mensagens são exibidas ao usuário conforme ações realizadas (ex: cadastro, erro, etc).
Instalação e Execução
1. Clonar o Repositório
bash
Copiar código
git clone https://github.com/seuusuario/projetoAgenda.git
cd projetoAgenda
2. Instalar Dependências
Instale as dependências do projeto usando o npm ou yarn.

bash
Copiar código
npm install
# ou
yarn install
3. Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto e adicione as variáveis de ambiente necessárias:

bash
Copiar código
CONNECTIONSTRING=mongodb://localhost:27017/seubanco
4. Executar o Servidor
Execute o servidor localmente:

bash
Copiar código
npm start
# ou
yarn start
O servidor será executado na porta 3000. Acesse http://localhost:3000 no seu navegador.

5. Testando
Cadastro: Acesse /cadastre-se para criar uma nova conta.
Login: Acesse /login/index para fazer login.
Contatos: Após o login, acesse /contato para visualizar, cadastrar ou editar contatos.
Estrutura de Diretórios
bash
Copiar código
/app
  /controllers          # Controladores que gerenciam a lógica de negócios
  /models               # Modelos do banco de dados
  /views                # Templates EJS
  /middlewares          # Funções de middleware (ex: autenticação, CSRF)
  /routes               # Definição de rotas do Express
/public                 # Arquivos estáticos (CSS, JS, imagens)
Contribuições
Faça um fork deste repositório.
Crie uma branch para sua modificação (git checkout -b minha-modificacao).
Faça commit das suas alterações (git commit -am 'Adicionando nova funcionalidade').
Envie para o repositório original (git push origin minha-modificacao).
Abra um pull request.
Licença
Este projeto está licenciado sob a MIT License.
