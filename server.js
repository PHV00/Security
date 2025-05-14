require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }))
server.set('view engine', 'ejs');

const port = 3000;

const database = mysql.createConnection({
    host:  process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
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

// GET - List All Users
server.get('/users', (request, response) => {
    database.query('SELECT * FROM user', (error, datas) => {
        if (error) return response.status(500).send(error);
        response.json(datas);
    });
});

// GET - Get a user
server.get('/user/:id', (request, response) => {
    query = `SELECT * FROM user where id = '${request.params.id}' `;
    database.query(query, (error, datas) => {
        if (error) return response.status(500).send(error);
        response.json(datas);
    });
});

// POST - Create User
server.post('/insertuser', (request, response) => {
    const { name, password } = request.body;
    hashPassword(password).then((newPassword)=>{
        database.query('INSERT INTO user (name, password) VALUES ("'+name+'","'+newPassword+'")', (error) => {
            if (error) return response.status(500).send(error);
            response.status(201).json({name});
        });
    })
});

// PUT - Update User
server.put('/user/:id', (request, response) => {
    const { name } = request.body;

    database.query('UPDATE user SET name = "'+name+'" WHERE id = '+request.params.id+'', (error, result) => {
        if (error) return response.status(500).send(error);
        if (result.affectedRows === 0) return response.status(404).send('User not found!');
        response.json({ id: request.params.id, name});
    });
});

// DELETE - Delete User
server.delete('/user/:id', (request, response) => {
    database.query('DELETE FROM user WHERE id = '+request.params.id+'', (error, result) => {
        if (error) return express.response.status(500).send(error);
        if (result.affectedRows === 0) return response.status(404).send('User not found!');
        response.status(204).send();
    });
});

server.post('/comments',(request,response)=>{
    const {author, message} = request.body;
    console.log(request.body);
    database.query('INSERT INTO comment (comment, author) VALUES ("'+message+'","'+author+'")', (error) => {
        if (error) return response.status(500).send(error);
        response.status(201).json({message});
    });
    response.status(201);
});

server.get('/comments',(request,response)=>{
    database.query('SELECT * FROM comment', (error, comments) => {
        if (error) return response.status(500).send(error);
        response.render('comments',{comments});
    });
})

// Start Server
server.listen(port, () => {
    console.log(`Server its running in http://localhost:${port}`);
});