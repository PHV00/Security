require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validationJWT = require('./middleware.js');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }))
server.set('view engine', 'ejs');

const port = 3000;

const database = mysql.createConnection({
    host:  process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

database.connect(error => {
    if (error) {
        console.error('Database can not be connected :', error);
    }
    else{
        console.log('Database conected');
    }
});

function hashPassword(password) {
    return bcrypt.hash(password, 10);
}

// GET - Get a user
server.get('/user/:id', (request, response) => {
    query = `SELECT * FROM user where id = '${request.params.id}' `;
    database.query(query, (error, datas) => {
        if (error) return response.status(500).send(error);
        response.json(datas);
    });
});

// GET - user - page
server.get('/users-page', (request,response)=>{
    database.query('SELECT * FROM user', (error, users) => {
        if (error) return response.status(500).send(error);
        response.render('users',{users});
    });
})

// GET - csrf - page
server.get('/CSRF', (request,response)=>{
    response.render('csrf');
})

// POST - Create User
server.post('/insertuser', (request, response) => {
    const { username, email , password } = request.body;

    if(!username||!email||!password) response.status(400).send("Invalid password or username or email !");

    hashPassword(password).then((newPassword)=>{
        database.query('INSERT INTO user (username, email, password) VALUES (?, ?, ?)', [username, email, newPassword], (error) => {
            if (error) return response.status(500).send(error);
            response.status(201).json({username});
        });
    })
});

server.post('/login', (request, response) => {
  const { username, password } = request.body;

  database.query('SELECT * FROM user WHERE username = ?', [username], 
    async (error, results) => {
        if (error || results.length === 0) return response.status(401).json({ error: 'User or password is incorrect!' });

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) return response.status(401).json({ error: 'User or password is incorrect!' });

        const jwtToken = jwt.sign({ id: user.id, username:user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(jwtToken)
        response.json({ jwtToken });
    }
    );
});

//PROTEGER

// GET - List All Users
server.get('/users', validationJWT ,(request, response) => {
    database.query('SELECT * FROM user', (error, datas) => {
        if (error) return response.status(500).send(error);
        response.json(datas);
    });
});

// PUT - Update User
server.put('/user/:id', validationJWT, (request, response) => {
    const { username, email, password } = request.body;

    database.query('UPDATE user SET username = ?, email = ? , password = ? WHERE id = ?', [ username, email, password , request.params.id], (error, result) => {
        if (error) return response.status(500).send(error);
        if (result.affectedRows === 0) return response.status(404).send('User not found!');
        response.json({ id: request.params.id, username});
    });
});

// DELETE - Delete User
server.delete('/user/:id', validationJWT, (request, response) => {
    database.query('DELETE FROM user WHERE id = ?', [request.params.id], (error, result) => {
        if (error) return express.response.status(500).send(error);
        if (result.affectedRows === 0) return response.status(404).send('User not found!');
        response.status(204).send("User deleted!");
    });
});



// Start Server
server.listen(port, () => {
    console.log(`Server its running in http://localhost:${port}`);
});