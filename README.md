Pentesting API
O projeto está separado em duas branch: incorrectServer: Versão sem segurança correctServer : Versão com segurança

🛠 Tecnologias

Node.js
Express
MySQL
bcrypt
JWT
dotenv
ejs
jsonwebtoken

📦 Instalação
npm install
🚀 Rodar localmente
node server.js
📋 Variáveis de ambiente
Crie um arquivo .env com:

DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=
DATABASE_NAME=security
PORT=3000
JWT_SECRET=Nota10

🗃️ Banco de dados:

CREATE DATABASE Security;

USE Security;

CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) not null,
  email VARCHAR(255) not null,
  password VARCHAR(255) not null
);

CREATE DATABASE Insecurity;

USE Insecurity;

CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  password VARCHAR(255)
);

🧪 Exemplos de requisições (Postman)
Registro
POST /users/register
{
  "username": "admin",
  "email": "admin@email.com",
  "password": "123456"
}
Login
POST /users/login
{
  "email": "admin@email.com",
  "password": "123456"
}
Acesso protegido (com token JWT)

👥 Equipe
Desenvolvido por: Pedro Henrique Vitoreti
