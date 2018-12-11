const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const pg = require('pg');

//controllers for routes
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();
app.use(bodyParser.json());
app.use(cors());

//postgres database configuration into with knex
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'pass',
        database: 'facial-recog'
    }
});

//ENTRYPOINT 
app.get('/', (req, res) => {
    res.json(database.users);
});

//-----------------------------------------------------------------
//SIGNIN
app.post('/signin', (req, res) => {
    signin.handleSignin(req, res, db, bcrypt);
});

//-----------------------------------------------------------------
//REGISTER USERS
app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt);
});

//-----------------------------------------------------------------
//RESPONDS WITH USER INFO BASED ON ID
app.get('/profile/:id', (req, res, db) => {
    profile.handleProfile(req, res, db);
});

//-----------------------------------------------------------------
//INCREMENTS AND UPDATES USER ENTRIES FROM IMAGE UPLOADS
app.put('/image', (req, res) => {
    image.handleImage(req, res, db);
});

//TAKES USER ENTERED URL AND SENDS TO BACKEND
app.post('/imageUrl', (req, res) => {
    image.handleApiCall(req, res);
});

app.listen(2000, () => {
    console.log('Server running on port 2000');
});