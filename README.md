# Pentesting API
O projeto está separado em duas branch: 
  incorrectServer: Versão sem segurança 
  correctServer : Versão com segurança

## 🛠 Tecnologias

-Node.js
-Express
-MySQL
-bcrypt
-JWT
-dotenv
-ejs
-jsonwebtoken

##📦 Instalação
```bash
npm install
```
##🚀 Rodar localmente
```bash
node server.js
```
##📋 Variáveis de ambiente

Crie um arquivo .env com:
```
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=
DATABASE_NAME=security
PORT=3000
JWT_SECRET=Nota10
```
🗃️ Banco de dados:

```sql
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
```
##🧪 Exemplos de requisições (Postman)
-Para acessar  basta entrar em :https://app.getpostman.com/join-team?invite_code=45ee1121586d7d01c61ba14b666565a1ee88cb57f143fa962126528eca5820fe&target_code=17a0968f842d2073f3adbe4e852eb64f
### Registro
POST /insertuser
{
    "email" : "pedro@gmail.com",
    "username" : "pedro",
    "password" : "123"
}
Login
POST /users/login
{
  "username": "pedro",
  "password": "123"
}
Acesso protegido (com token JWT)

##👥 Equipe
-Desenvolvido por: Pedro Henrique Vitoreti
